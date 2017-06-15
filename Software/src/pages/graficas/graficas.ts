import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//providers
import { EmpService } from "../../providers/emp-service";
import { EmpEcaProvider } from "../../providers/emp-eca/emp-eca";
import { EmpEcaHumedadProvider } from "../../providers/emp-eca-humedad/emp-eca-humedad";

//modelos
import { Temperatura } from "../../models/temperatura";
import { Humedad } from "../../models/humedad";
import { RangoSensorModel } from "../../models/rangoSensor";

import { Eca } from "../../models/eca";

//mostrar alert y toast en pantalla
import { AlertController, ToastController } from "ionic-angular";

@IonicPage()
@Component({
  selector: 'page-graficas',
  templateUrl: 'graficas.html',
})
export class Graficas {

  //vector que almacena los datos de la grafica
  private datosTemp = [];  
  private datosHum = [];  

  //variable auciliar para organizar los datos en el vector de datos
  private cantTemp : number;
  //variable para almacenar el tiempo de retardo
  private delayTemp : number;
  //numero de peticones que realiza al servidor
  private iteracionesTemp : number;


  //variable auciliar para organizar los datos en el vector de datos
  private cantHum : number;
  //variable para almacenar el tiempo de retardo
  private delayHum : number;
  //numero de peticones que realiza al servidor
  private iteracionesHum : number;

  //vector de opciones para almacenar la configuracion de los graficos
  private chartOptionsTem: any;     
  private chartOptionsHum: any;   

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public empService : EmpService, ecaService : EmpEcaProvider, 
              public alertCtrl: AlertController, public toastCtrl: ToastController) {
    this.datosTemp = [];        
    this.datosHum = [];
    this.delayHum = 2000;
    this.delayTemp = 2000;  
    this.getTemperatura();
    this.getHumedad();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Graficas');
  }

  private actualizar(){
    this.datosHum = [];
    this.datosTemp = [];
    this.getTemperatura();
    this.getHumedad();    
  }


  private getTemperatura(){          
      this.mostrarToast('Por favor tenga paciencia, se estan cargando los datos.',3000);
      var i : number = 0;
      //ciclo para solicitar los diez valores de temperatura
      for (i = 0; i< 10; i++){
        console.log("iteracion " + i);
        //suscribe tiene dos argumentos, uno en caso de exito y otro en caso de error
        this.empService.getTemperatura().subscribe(
          tempertura => 
            //si la peticion es exitosa envia el dato de temperatura
            this.loadTemperatura(tempertura, null), 
            err => this.loadTemperatura(null, err)
        );        
      };
      //llamado al retardo de tiempo
      this.wait(this.delayTemp);  
      //se inicializa la varible auxiliar a su estado inicial
      this.cantTemp = 1;        
  }

  private loadTemperatura(temperatura: Temperatura, err: string){          
    //si ocurre un error, informa y dibuja la grafica
    if(err){      
      console.log("conexion rechazada");
      console.log(err);      
      this.dibujarGraficaTemp();
      return;
    }        
    //alamacena los datos retornados en la peticion en un vector
    this.datosTemp.push([+temperatura.valor, this.cantTemp]);
    console.log("  " + this.datosTemp);
    console.log("respuesta: " + temperatura.valor);            
    //contador auxiliar para ayudar a ordenar el vector que contiene los resultados
    this.cantTemp = this.cantTemp + 1;
    //si ya se hicieron las 10 iteraciones y no hubo errores, se pinta la grafica
    if(this.cantTemp == 10){
      this.dibujarGraficaTemp();
    }
  }  

 //metodo que se encarga de dar los valores adecuados para que se dibuje la grafica
  dibujarGraficaTemp(){
    console.log("en componente de temperatura para graficar");
    this.chartOptionsTem = {
      chart: {
        type: 'line',
        inverted: true
      },
      title: {
          text: "Temperatura Vs Tiempo"
      },
      subtitle: {
          text: 'La grafica puede variar con respecto a los valores reales'
      },
      xAxis: {
          reversed: false,
          title: {
              enabled: true,
              text: "Temperatura"
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
          title: { text: "Tiempo" },
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
          name: "Temperatura",
          data: this.datosTemp
      }]
    }  

  }   

  private getHumedad(){          
      this.mostrarToast('Por favor tenga paciencia, se estan cargando los datos.',3000);
      var i : number = 0;
      //ciclo para solicitar los diez valores de humedad
      for (i = 0; i< 10; i++){
        console.log("iteracion " + i);
        //suscribe tiene dos argumentos, uno en caso de exito y otro en caso de error
        this.empService.getHumedad().subscribe(
          humedad => 
            //si la peticion es exitosa envia el dato de humedad
            this.loadHumedad(humedad, null), 
            err => this.loadHumedad(null, err)
        );        
      };
      //llamado al retardo de tiempo
      this.wait(this.delayHum);  
      //se inicializa la varible auxiliar a su estado inicial
      this.cantHum = 1;        
  }

private loadHumedad(humedad: Humedad, err: string){          
    //si ocurre un error, informa y dibuja la grafica
    if(err){      
      console.log("conexion rechazada");
      console.log(err);      
      this.dibujarGraficaHum();
      return;
    }        
    //alamacena los datos retornados en la peticion en un vector
    this.datosHum.push([+humedad.valor, this.cantHum]);
    console.log("  " + this.datosHum);
    console.log("respuesta: " + humedad.valor);        
    //contador auxiliar para ayudar a ordenar el vector que contiene los resultados
    this.cantHum = this.cantHum + 1;
    //si ya se hicieron las 10 iteraciones y no hubo errores, se pinta la grafica
    if(this.cantHum == 10){
      this.dibujarGraficaHum();
    }
  }

   //metodo que se encarga de dar los valores adecuados para que se dibuje la grafica
  dibujarGraficaHum(){
    console.log("en componente de humedad para graficar");
    this.chartOptionsHum = {
      chart: {
        type: 'line',
        inverted: true
      },
      title: {
          text: "Humedad Vs Tiempo"
      },
      subtitle: {
          text: 'La grafica puede variar con respecto a los valores reales'
      },
      xAxis: {
          reversed: false,
          title: {
              enabled: true,
              text: "Humedad"
          },
          labels: {
              formatter: function () {
                  return this.value + '%';
              }
          },
          maxPadding: 0.05,
          showLastLabel: true
      },
      yAxis: {
          title: { text: "Tiempo" },
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
          name: "Humedad",
          data: this.datosHum
      }]
    }  

  }   


  
 //realizar un retrazo para que se de tiempo a la peticion de retornar algo
  wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
    }
  }

  private mostrarToast(msj: string, time: number){
    let toast = this.toastCtrl.create({
      message: msj,
      duration: time,
      position: 'middle'
    });
    toast.present();
  }

  public mostrarAlert(titulo: string, subtitulo: string, boton: string){
    let alert  =  this.alertCtrl.create({
          title: titulo,
          subTitle: subtitulo, 
          buttons: [boton]
      });
      alert.present();
  }


}
