import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourtsRoutingModule } from './courts-routing.module';
import { CourtsComponent } from './courts.component';


@NgModule({
  declarations: [
    CourtsComponent
  ],
  imports: [
    CommonModule,
    CourtsRoutingModule
  ]
})
export class CourtsModule { }
