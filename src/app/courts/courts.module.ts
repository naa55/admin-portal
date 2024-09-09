import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourtsRoutingModule } from './courts-routing.module';
import { CourtsComponent } from './courts.component';
import { NgbDatepickerModule, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CourtsComponent
  ],
  imports: [
    CommonModule,
    CourtsRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbModule,
    NgbModalModule,
    SharedModule
  ]
})
export class CourtsModule { }
