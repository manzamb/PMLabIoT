import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector   : 'grafica',
  templateUrl   : 'grafica.html' 
})
  
export class Grafica implements OnInit{
  @Input() name_sensor  : string;
  @Input() name_var     : string;
  @Input() sensor_id    : string;
  @Input() unidades     : string;
  @Input() var          : string;  
  
  datos = [[0, 0], [10, 10], [30, 20], [20, 30], [50, 40],
              [10, 50], [30, 60], [20, 70], [50, 80]]
  
  chartOptions: any;    

  constructor() {    
    console.log("en componente de graficas" + this.var);    
  }

  ngOnInit() {    
    console.log("en componente de graficas lista valores" + this.var);
    console.log(this.name_sensor);
    this.chartOptions = {
      chart: {
        type: 'line',
        inverted: true
      },
      title: {
          text: this.name_sensor + ' vs ' + this.name_var
      },
      subtitle: {
          text: 'La grafica puede variar con respecto a los valores reales'
      },
      xAxis: {
          reversed: false,
          title: {
              enabled: true,
              text: this.name_sensor
          },
          labels: {
              formatter: function () {
                  return this.value + '°';
              }
          },
          maxPadding: 0.05,
          showLastLabel: true
      },
      yAxis: {
          title: {
              text: this.name_var + ' (' +this.unidades + ')'
          },
          labels: {
              formatter: function () {
                  return this.value;
              }
          },
          lineWidth: 2
      },
      legend: {
          enabled: false
      },
      tooltip: {
          headerFormat: '<b>{series.name}</b><br/>',
          pointFormat: '{point.x} : {point.y}'
      },
      plotOptions: {
          spline: {
              marker: {
                  enable: false
              }
          }
      },
      series: [{
          name: this.name_sensor,
          data: this.datos
      }]
    }
  }  
}
