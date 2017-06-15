import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SnsTemperatura } from './sns-temperatura';

@NgModule({
  declarations: [
    SnsTemperatura,
  ],
  imports: [
    IonicPageModule.forChild(SnsTemperatura),
  ],
  exports: [
    SnsTemperatura
  ]
})
export class SnsTemperaturaModule {}
