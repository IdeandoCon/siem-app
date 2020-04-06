import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { CommonModule } from '@angular/common';
import { RecaudadoComponent } from './recaudado/recaudado.component';
import { GastadoComponent } from  './gastado/gastado.component';





@NgModule({
  declarations: [GastadoComponent,
    RecaudadoComponent,],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    GastadoComponent,
    RecaudadoComponent,
  ]
})
export class ComponentsModule { }
