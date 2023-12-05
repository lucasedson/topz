import NetworkArea from '@/components/network'
import styles from './page.module.css'
import MemoryArea from '@/components/memory'
import CpuArea from '@/components/cpu'
import ProcessesArea from '@/components/process'
import MainLayout from '@/components/mainLayout'

export default function Home() {
  return (
    <main>
      <div>
        {/* <CpuArea />
        <MemoryArea />
        <NetworkArea />
        <ProcessesArea /> */}

        <MainLayout/>
      </div>
    </main>
  )
}
