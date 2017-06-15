import { Component, OnInit, Output, Input, EventEmitter  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NavController } from "ionic-angular";
import { RangoSensorModel } from "../../models/rangoSensor";

@Component({
  selector: 'rango-sensor',
  templateUrl: 'rango-sensor.html'
})
export class RangoSensor implements OnInit {
  @Output() max: string;
  @Output() min: string;  

  @Input() texto: string;
  @Input() texto2: string;

  @Output() notificar: EventEmitter<RangoSensorModel> = new EventEmitter<RangoSensorModel>();
  
  formRango: FormGroup;  
 
  //es recomendable que en el contructor solo se declaren variables  
  constructor( public navCtrl: NavController, public fb: FormBuilder) {
    console.log('Hello RangoSensor Component');            
    this.formRango = this.fb.group({
      'minimo': ['' , [Validators.required, Validators.minLength(1), Validators.maxLength(2), Validators.pattern(/^\d*$/)]],
      'maximo': ['' , [Validators.required, Validators.minLength(1), Validators.maxLength(2), Validators.pattern(/^\d*$/)]]
    });
  }

//esta funcion se ejecuta cuando el componente ya esta listo pra usarse  
  ngOnInit(){
    console.log("Rango sensor " + this.texto);    
    console.log("Rango sensor2 " + this.texto2);
  }  

  actualizar(){
    console.log(this.formRango.value);
    let rango = new RangoSensorModel(this.formRango.value.minimo, this.formRango.value.maximo);
    this.notificar.emit(rango);
  }
}
