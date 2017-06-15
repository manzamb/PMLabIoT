import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Temporizador } from './temporizador';

@NgModule({
  declarations: [
    Temporizador,
  ],
  imports: [
    IonicPageModule.forChild(Temporizador),
  ],
  exports: [
    Temporizador
  ]
})
export class TemporizadorModule {}
