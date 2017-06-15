import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Graficas } from './graficas';

@NgModule({
  declarations: [
    Graficas,
  ],
  imports: [
    IonicPageModule.forChild(Graficas),
  ],
  exports: [
    Graficas
  ]
})
export class GraficasModule {}
