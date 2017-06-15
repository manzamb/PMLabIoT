import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import del servicio conector
import { EmpService } from "../../providers/emp-service";
import { FlujoAgua } from "../../models/flujoAgua";

//mostrar alert y toast en pantalla
import { AlertController, ToastController } from "ionic-angular";

@IonicPage()
@Component({
  selector: 'page-sns-flujoagua',
  templateUrl: 'sns-flujoagua.html',
  providers: [EmpService],
})
export class SnsFlujoagua {

  private valor : string;
  private mensaje : string;
  private color : string;


  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public empService: EmpService, public alertCtrl: AlertController, public toastCtrl: ToastController)
  {
    this.color = "light";
    empService.getFlujoAgua().subscribe(flujoAgua=> this.loadFlujo(flujoAgua, null), err => this.loadFlujo(null, err));
    this.mostrarToast('Por favor espere, los datos estan siendo obtenidos', 4000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SnsFlujoagua');    
  }

  private loadFlujo(flujo: FlujoAgua, err: string){    
    if(err){
      console.log(err);
      this.valor = "None";
      return;
    }
    this.valor = flujo.distancia;  
    var aux = parseFloat(this.valor);
    if (aux < 10.00){
      this.mensaje = "Flujo de agua activo"    
      this.color = "secondary";
    }
    else{
      this.mensaje = "Flujo de agua inactivo"  
      this.color = "danger";
    }    
  }


 public mostrarAlert(titulo: string, subtitulo: string, boton: string){
    let alert  =  this.alertCtrl.create({
          title: titulo,
          subTitle: subtitulo, 
          buttons: [boton]
      });
      alert.present();
  }

  private mostrarToast(msj: string, time: number){
    let toast = this.toastCtrl.create({
      message: msj,
      duration: time,
      position: 'middle'
    });
    toast.present();
  }
}
