import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CounsellorsRoutingModule } from './counsellors-routing.module';
import { CounsellorsComponent } from '../counsellors/counsellors.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotifierModule } from 'angular-notifier';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CounsellorsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CounsellorsRoutingModule,
    NgxPaginationModule,
    NgbModule,
    NgbModalModule,
    NotifierModule,
    SharedModule
  ]
})
export class CounsellorsModule { }
