import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {Apagar} from '../apagar/apagar';
import {Sensores} from '../sensores/sensores';
import {Graficas} from "../graficas/graficas";
import {Temporizador} from '../temporizador/temporizador';

/**
 * Generated class for the Inicio page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html',
})
export class Inicio {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  irPagina(numPagina){
    if(numPagina == 1){
      this.navCtrl.push(Apagar)  
    }
    if(numPagina == 2){
      this.navCtrl.push(Sensores)  
    }    
    if(numPagina == 3){
      this.navCtrl.push(Graficas)  
    } 
    if(numPagina == 4){
      this.navCtrl.push(Temporizador)  
    } 
  }
  
  ionViewDidLoad() {
    console.log('Inicio page esta cargada');
  }

}
