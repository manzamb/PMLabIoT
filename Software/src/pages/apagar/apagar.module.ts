import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Apagar } from './apagar';

@NgModule({
  declarations: [
    Apagar,
  ],
  imports: [
    IonicPageModule.forChild(Apagar),
  ],
  exports: [
    Apagar
  ]
})
export class ApagarModule {}
