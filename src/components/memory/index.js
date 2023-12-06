import {Chart, ArcElement } from "chart.js";
import {Doughnut} from 'react-chartjs-2';
import  './styles.css'
Chart.register(ArcElement)


function bytesToGB(bytes) {
  return (bytes / 1024 / 1024 / 1024).toFixed(2);
}

export default function MemoryArea(props) {
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
          data: [bytesToGB(props.memory.used), bytesToGB(props.memory.available)]
        
        
        }
        
      ]
      }

    return (
      <main>
        <div className='memoryArea--container'>
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
              (parseFloat(bytesToGB(props.memory.used)) / bytesToGB(props.memory.total) * 100).toFixed(0)}%</h1>
          </div>

          </div>

          <div className='memoryInfo'>
          <p>Total Memory</p>
              <h3
              >{parseFloat(Math.round(bytesToGB(props.memory.total)))} GB</h3>

              <p>Used Memory</p>
              <h3>{parseFloat(bytesToGB(props.memory.used))} GB</h3>

              <p>Free Memory</p>
              <h3>{parseFloat(bytesToGB(props.memory.free))} GB</h3>

              <p>Avaliabe Memory</p>
              <h3>{parseFloat(bytesToGB(props.memory.available))} GB</h3>
          </div>
        </div>
      </main>
    )
  }
  