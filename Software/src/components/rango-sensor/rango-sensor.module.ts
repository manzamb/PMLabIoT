import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RangoSensor } from './rango-sensor';

@NgModule({
  declarations: [
    RangoSensor,
  ],
  imports: [
    IonicPageModule.forChild(RangoSensor),
  ],
  exports: [
    RangoSensor
  ]
})
export class RangoSensorModule {}
