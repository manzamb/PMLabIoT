import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SnsHumedad } from './sns-humedad';

@NgModule({
  declarations: [
    SnsHumedad,
  ],
  imports: [
    IonicPageModule.forChild(SnsHumedad),
  ],
  exports: [
    SnsHumedad
  ]
})
export class SnsHumedadModule {}
