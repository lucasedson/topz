import CpuArea from "../cpu";
import MemoryArea from "../memory";
import NetworkArea from "../network";
import ProcessesArea from "../process";

import "./styles.css";
export default function MainLayout() {
    return (
        <main>
          <div className="mainArea">
            <div className="cpuArea">
            <CpuArea/>
            </div>
            <div className="secondArea">
                <div className="leftArea">

                    <div className="memoryArea">
                        <MemoryArea/>
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
  