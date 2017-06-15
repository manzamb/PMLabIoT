import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//providers
import { EmpService } from "../../providers/emp-service";
import { EmpEcaProvider } from "../../providers/emp-eca/emp-eca";

//modelos
import { Temperatura } from "../../models/temperatura";
import { RangoSensorModel } from "../../models/rangoSensor";

import { Eca } from "../../models/eca";

//mostrar alert y toast en pantalla
import { AlertController, ToastController } from "ionic-angular";

@IonicPage()
@Component({
  selector: 'page-sns-temperatura',
  templateUrl: 'sns-temperatura.html',
})
export class SnsTemperatura {

  //variable que almacena la temperatura de la ultima peticion a los sensores
  private temp        : string;  
  //variable auciliar para organizar los datos en el vector de datos
  private cant : number;
  //variable para almacenar el tiempo de retardo
  private delay : number;  
  //vector que almacena los datos de la grafica
  private datos = [];  
  //vector de opciones para almacenar la configuracion de los graficos
  private chartOptions: any; 
  //objeto del rovider empEca para realizar las peticones al servidor
  private ecaService : EmpEcaProvider;

  //variables para indicar que los ecas fueron exitosos
  private ecaMax : number;
  private ecaMin : number;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public empService : EmpService, ecaService : EmpEcaProvider, 
              public alertCtrl: AlertController, public toastCtrl: ToastController) {
      //solicita que se realizen las peticiones
      this.ecaService = ecaService;
      this.getTemperatura();
      this.datos = [];    
      this.delay = 2000;      
  }

  //cuando el componente este listo se realizan las operaciones correspondientes
  ionViewDidLoad() {
    console.log('ionViewDidLoad SnsTemperatura  ' + this.datos);        
  }

  private actualizar(){
    this.datos = [];    
    this.getTemperatura();
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
      this.wait(this.delay);  
      //se inicializa la varible auxiliar a su estado inicial
      this.cant = 1;        
  }

  private loadTemperatura(temperatura: Temperatura, err: string){          
    //si ocurre un error, informa y dibuja la grafica
    if(err){      
      console.log("conexion rechazada");
      console.log(err);
      this.temp = "None";
      this.dibujarGrafica();
      return;
    }        
    //alamacena los datos retornados en la peticion en un vector
    this.datos.push([+temperatura.valor, this.cant]);
    console.log("  " + this.datos);
    console.log("respuesta: " + temperatura.valor);        
    this.temp = temperatura.valor;  
    //contador auxiliar para ayudar a ordenar el vector que contiene los resultados
    this.cant = this.cant + 1;
    //si ya se hicieron las 10 iteraciones y no hubo errores, se pinta la grafica
    if(this.cant == 10){
      this.dibujarGrafica();
    }
  }
     

  //metodo que se encarga de dar los valores adecuados para que se dibuje la grafica
  dibujarGrafica(){
    console.log("en componente de temperatura para graficar");
    this.chartOptions = {
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
          data: this.datos
      }]
    }  

  }   

  recibirValoresRango(mensaje : RangoSensorModel){    
    this.mostrarToast('Enviando solicitud. El proceso puede tomar varios segundos.',3000);
    console.log("recibiendo datos del componente sensor hijo");
    console.log(mensaje.minimo);
    console.log(mensaje.maximo);      

    this.ecaService.deleteTemperaturaMax().subscribe(
      status => 
        this.eliminarEcaTempMax(status, mensaje.maximo, null),
        err => this.eliminarEcaTempMax(null, null ,err)
    )

    this.ecaService.deleteTemperaturaMin().subscribe(
      status => 
        this.eliminarEcaTempMin(status, mensaje.minimo, null),
        err => this.eliminarEcaTempMin(null, null, err)
    )

    this.verificarEstadoSolicitudEcas();
  }

  private eliminarEcaTempMax(res : Eca, valor: string, err : string){        
    if(err){
      console.log("error en maxima  "  + err );
      return;
    }
    console.log("procesado eliminar temp max");
    if(res.valor == 200) {
      this.ecaService.putTemperaturaMax(+valor).subscribe(
      status => 
        this.resolverTemperaturaMax(status, null),
        err => this.resolverTemperaturaMax(null, err)
      )
    }  
  }
  
  private eliminarEcaTempMin(res : Eca, valor: string, err : string){    
    if(err){
      console.log("error en minima  "  + err );
      return;
    }
    console.log("procesado eliminar temp min");
    if(res.valor == 200) {
      this.ecaService.putTemperaturaMin(+valor).subscribe(
      status => 
        this.resolverTemperaturaMin(status, null),
        err => this.resolverTemperaturaMin(null, err)
      )
    }      
  }

  private resolverTemperaturaMax(status : Eca , err: string){
    console.log("eca temp max realizado");
    this.ecaMax = 1;
    this.verificarEstadoSolicitudEcas();
  }

  private resolverTemperaturaMin(status : Eca, err: string){
    console.log("eca temp min realizado");
    this.ecaMin = 1;
    this.verificarEstadoSolicitudEcas();
  }


  //verifica si se realizaron las solicitudes correctamente
  private verificarEstadoSolicitudEcas(){
    if (this.ecaMax == 1 && this.ecaMin == 1){
      console.log("se realizo solicitud de ecas correctamente");
      this.mostrarAlert(
        'Actualización',
        'La actualización de los valores para los rangos del sensor de temperatura se realizó exitosamente.',
        'Aceptar');
    }
    else{
      console.log("error en solicitud de ecas");
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
