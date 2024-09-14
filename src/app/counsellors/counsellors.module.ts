import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CounsellorsRoutingModule } from './counsellors-routing.module';
import { CounsellorsComponent } from '../counsellors/counsellors.component';


@NgModule({
  declarations: [
    CounsellorsComponent
  ],
  imports: [
    CommonModule,
    CounsellorsRoutingModule
  ]
})
export class CounsellorsModule { }
