import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CouncellorsRoutingModule } from './councellors-routing.module';
import { CouncellorsComponent } from './councellors.component';


@NgModule({
  declarations: [
    CouncellorsComponent
  ],
  imports: [
    CommonModule,
    CouncellorsRoutingModule
  ]
})
export class CouncellorsModule { }
