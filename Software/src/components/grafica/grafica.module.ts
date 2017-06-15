import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Grafica } from './grafica';

@NgModule({
  declarations: [
    Grafica,
  ],
  imports: [
    IonicPageModule.forChild(Grafica),
  ],
  exports: [
    Grafica
  ]
})
export class GraficaModule {}
