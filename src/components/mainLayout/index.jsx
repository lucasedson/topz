'use client'
import { invoke } from '@tauri-apps/api/tauri'
import { useEffect, useState } from 'react';
import CpuArea from "../cpu";
import MemoryArea from "../memory";
import NetworkArea from "../network";
import ProcessesArea from "../process";

import "./styles.css";


export default function MainLayout() {
    const [object, setObject] = useState({
        memory: {
            total: 0,
            used: 0,
            free: 0,
            available: 0
        }
    });
       
    useEffect(() => {
        setInterval(() =>{            
            invoke('get_all_informations', { name: 'Next.js' })
            .then(result => setObject(result))
            .catch(console.error)
            
        }, 1000)
    }, [])



    return (
        <main>
          <div className="mainArea">
            <div className="cpuArea">
            <CpuArea/>
            </div>
            <div className="secondArea">
                <div className="leftArea">

                    <div className="memoryArea">
                        <MemoryArea memory={object.memory}/>
                    </div>

                    <div className="networkArea">
                        <NetworkArea />
                    </div>
                </div>

                <div className="processArea">
                    <ProcessesArea />
                </div>
            </div>
          </div>
        </main>
      )
  }
  