import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ApagarProvider } from "../../providers/apagar/apagar";

import { Encendido } from "../../models/encendido";

@IonicPage()
@Component({
  selector: 'page-apagar',
  templateUrl: 'apagar.html',
})
export class Apagar {

  estado : string;
  tiempo : number;
  accion : string;
  num: number;
  color : string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public apagarService: ApagarProvider) {
    this.estado = "apagado";
    this.tiempo = 0;
    this.accion = 'encender';
    this.color = 'light';
    this.num = 0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Apagar');
  }

  private apagarEstacion(){
    
    if(this.num % 2 == 0){
      console.log("encendiendo sensores...");
      this.color = 'secondary';
      this.apagarService.encenderEstacion().subscribe(
          encendido => this.procesarRespuestaEncender(encendido, null),
          err => this.procesarRespuestaEncender(null, err)
      )      
    }
    else{
      console.log("apagando sensores...");
      this.color = 'danger';
      this.apagarService.apagarEstacion().subscribe(
          encendido => this.procesarRespuestaApagar(encendido, null),
          err => this.procesarRespuestaApagar(null, err)
      )
    }
    this.num ++;    
  }

  private procesarRespuestaEncender(encendido : Encendido, err : string){
    console.log("procesando respuesta de solicitud encender EMP");
    if(err){
      console.log("error solicitando suministrar la corriente");
      return;
    }
    this.estado = encendido.estado;
    this.accion = 'Apagar';
    this.encenderEcas();
  }

  private procesarRespuestaApagar(encendido : Encendido, err : string){
    console.log("procesando respuesta de solicitud apagar EMP");
    if(err){
      console.log("error solicitando suspender la corriente");
      return;
    }
    this.estado = encendido.estado;
    this.accion = 'encender';   
    this.encenderEcas();
  }    

  private encenderEcas(){
    this.apagarService.encenderEcaTempMax();
    this.apagarService.encenderEcaTempMin();
    this.apagarService.encenderEcaHumMax();
    this.apagarService.encenderEcaHumMin();
  }

}
