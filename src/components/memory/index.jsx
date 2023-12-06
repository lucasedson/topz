'use client'
import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri'
import {Chart, ArcElement } from "chart.js";
import {Doughnut} from 'react-chartjs-2';
import  './styles.css'

Chart.register(ArcElement)


export default function MemoryArea() {
    const [object, setObject] = useState('');
    
    
    useEffect(() => {
        setInterval(() =>{
            
            invoke('get_all_informations', { name: 'Next.js' })
            .then(result => setObject(result))
            .catch(console.error)
            
        }, 1000)
    }, [])
    
    let state = {
          labels: ['Memory', 'Free'],
      datasets: [
        {
          label: '',
          backgroundColor: [
              '#F0012C',
            '#000AF9'
          ],
          hoverBackgroundColor: [
              '#F00011',
          '#00003f'
          ],

          borderColor: [
              '#001f3f',
          ],
          data: [(object.memory.used / 1024 / 1024 / 1024).toFixed(2), (object.memory.available / 1024 / 1024 / 1024).toFixed(2)]
        
        
        }
        
      ]
      }

    return (
      <main>
        <div className='memorArea'>
        <div className='memoryChartArea'>

        <Doughnut className='memoryChart'          
          data={state}
          options={
            {
                cutoutPercentage: 0,
                circumference: 360,
                rotation: -90,

                plugins: {
                    datalabels: {
                      display: true,
                      backgroundColor: '#ccc',
                      borderRadius: 30,
                      font: {
                        color: 'red',
                        weight: 'bold',
                      },
                    },
                    doughnutlabel: {
                        labels: [
                          {
                            text: '550',
                            font: {
                              size: 20,
                              weight: 'bold',
                            },
                          },
                          {
                            text: 'total',
                          },
                        ],
                      },
                    
                  }
                
                }
                
            }       
          />

        <div className='totalMemoryInfo'>
            <h6>Memory</h6>
            <h1>{
            (parseFloat((object.memory.used / 1024 / 1024 / 1024)) / 8 * 100).toFixed(0)
            
            }%</h1>
            </div>

        </div>

        <div className='memoryInfo'>
        <p>Total Memory</p>
            <h3
            >{parseFloat(Math.round(object.memory.total / 1024 / 1024 / 1024))} GB</h3>

            <p>Used Memory</p>
            <h3>{parseFloat((object.memory.used / 1024 / 1024 / 1024).toFixed(2))} GB</h3>

            <p>Free Memory</p>
            <h3>{parseFloat((object.memory.free / 1024 / 1024 / 1024).toFixed(2))} GB</h3>

            <p>Avaliabe Memory</p>
            <h3>{parseFloat((object.memory.available / 1024 / 1024 / 1024).toFixed(2))} GB</h3>
        </div>
        </div>
      </main>
    )
  }
  