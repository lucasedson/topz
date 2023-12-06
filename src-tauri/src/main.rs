// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use sysinfo::{CpuExt, NetworkExt, ProcessExt, System, SystemExt};

#[derive(Serialize, Deserialize, Debug)]
pub struct Process {
    pub pid: u32,
    pub name: String,
    pub disk_usage: u64,
    pub memory_usage: u64,
    pub cpu_usage: f32,
    pub path: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Memory {
    pub total: u64,
    pub used: u64,
    pub free: u64,
    pub available: u64,
}


#[derive(Serialize, Deserialize, Debug)]
pub struct Networks {
    pub name: String,
    pub mac: String,
    pub recv: u64,
    pub send: u64,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct CpuInformation {
    pub name: String,
    pub cpu_usage: f32,
}
#[tauri::command]
fn get_all_informations() -> Value {
    let mut sys = System::new_all();

    sys.refresh_all();

    fn get_all_processes(sys: &mut System) -> Vec<Process> {
        let mut processes: Vec<Process> = Vec::new();
        for (pid, process) in sys.processes() {
            let new_pid: u32 = format!("{}", pid).parse().unwrap();
            processes.push(Process {
                pid: new_pid,
                name: process.name().to_string(),
                disk_usage: process.disk_usage().total_read_bytes,
                memory_usage: process.memory(),
                cpu_usage: process.cpu_usage(),
                path: process.exe().to_string_lossy().to_string(),
            })
        }
        return processes;
    }

    fn get_memory(sys: &mut System) -> Memory {
        let memory: Memory = Memory {
            total: sys.total_memory(),
            used: sys.used_memory(),
            free: sys.free_memory(),
            available: sys.available_memory(),
        };
        return memory;
    }

    fn get_networks(sys: &mut System) -> Vec<Networks> {
        let mut networks: Vec<Networks> = Vec::new();
        for (name, net_data) in sys.networks() {
            networks.push(Networks {
                name: name.to_string(),
                mac: net_data.mac_address().to_string(),
                recv: net_data.total_packets_received(),
                send: net_data.total_packets_transmitted(),
            })
        }
        return networks;
    }

    fn get_cpu_informations(sys: &mut System) -> Vec<CpuInformation> {
        let mut cpu_informations: Vec<CpuInformation> = Vec::new();
        for cpu in sys.cpus() {
            cpu_informations.push(CpuInformation {
                name: cpu.name().to_string(),
                cpu_usage: cpu.cpu_usage(),
            })
        }
        return cpu_informations;
    }

    let json = json!({
        "processes": get_all_processes(&mut sys),
        "memory": get_memory(&mut sys),
        "networks": get_networks(&mut sys),
        "cpus" : get_cpu_informations(&mut sys)
    });

    return json;
}

fn main() {
    tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![get_all_informations])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
