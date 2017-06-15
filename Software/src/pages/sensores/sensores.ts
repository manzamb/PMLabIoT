import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SnsTemperatura } from "../sns-temperatura/sns-temperatura";
import { SnsHumedad } from "../sns-humedad/sns-humedad";
import { SnsFlujoagua } from "../sns-flujoagua/sns-flujoagua";

/**
 * Generated class for the Sensores page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-sensores',
  templateUrl: 'sensores.html',
})
export class Sensores {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Sensores');
  }

  irPaginaSensor(numSensor){
    if(numSensor == 1){
      this.navCtrl.push(SnsTemperatura)  
    }
    if(numSensor == 2){
      this.navCtrl.push(SnsHumedad)  
    }    
    if(numSensor == 3){
      this.navCtrl.push(SnsFlujoagua)  
    }    
  }

}
