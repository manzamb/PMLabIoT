import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SnsFlujoagua } from './sns-flujoagua';

@NgModule({
  declarations: [
    SnsFlujoagua,
  ],
  imports: [
    IonicPageModule.forChild(SnsFlujoagua),
  ],
  exports: [
    SnsFlujoagua
  ]
})
export class SnsFlujoaguaModule {}
