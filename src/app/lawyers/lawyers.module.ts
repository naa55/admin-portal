import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LawyersRoutingModule } from './lawyers-routing.module';
import { LawyersComponent } from './lawyers.component';


@NgModule({
  declarations: [
    LawyersComponent
  ],
  imports: [
    CommonModule,
    LawyersRoutingModule
  ]
})
export class LawyersModule { }
