import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImamsRoutingModule } from './imams-routing.module';
import { ImamsComponent } from '../imams/imams.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotifierModule } from 'angular-notifier';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ImamsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ImamsRoutingModule,
    NgxPaginationModule,
    NgbModule,
    NgbModalModule,
    NotifierModule,
    SharedModule
  ]
})
export class ImamsModule { }
