import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Sensores } from './sensores';

@NgModule({
  declarations: [
    Sensores,
  ],
  imports: [
    IonicPageModule.forChild(Sensores),
  ],
  exports: [
    Sensores
  ]
})
export class SensoresModule {}
