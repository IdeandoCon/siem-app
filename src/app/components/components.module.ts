import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { RecaudadoComponent } from './recaudado/recaudado.component';
import { GastadoComponent } from  './gastado/gastado.component';





@NgModule({
  declarations: [GastadoComponent,
    RecaudadoComponent,HeaderComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    GastadoComponent,
    RecaudadoComponent,
    HeaderComponent
  ]
})
export class ComponentsModule { }
