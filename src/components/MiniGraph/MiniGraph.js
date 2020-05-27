import React from 'react';
import {Line} from 'react-chartjs-2';

export default class MiniGraph extends React.Component {
  constructor(props){
      super(props);
      //console.log('Graph', props.graphData);
      this.state = {
        labels: props.graphLabel,
        datasets: [
          {
            fill: false,
            lineTension: 0.2,
            backgroundColor: 'rgba(255,255,255,1)',
            borderColor: props.borderColor,
            borderWidth: 3,
            data: props.graphData
          }
        ]
      }
  }
  render() {
    return (
      <div>
        <Line
          data={this.state}
        //   width={700}
          height={80}
          options={{
            responsive:true,
            maintainAspectRatio: false,
            tooltips: {
                enabled: false,
            },
            elements: {
                point:{
                    radius: 0
                }
            },
            title:{
              display:false
            },
            legend:{
              display:false
            },
            scales:{
                xAxes: [
                    {
                        display: false //this will remove all the x-axis grid lines
                    },
                    {
                        ticks: {
                            display: false //this will remove only the label
                        },
                        gridLines: {
                            display:false
                        }
                    }
                ],
                yAxes: [
                    {
                        display: false //this will remove all the x-axis grid lines
                    },
                    {
                        ticks: {
                            display: false //this will remove only the label
                        },
                        gridLines: {
                            display:false
                        }
                    }
                    
                ]
            }
          }}
        />
      </div>
    );
  }
}