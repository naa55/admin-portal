import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FamilyLawyerRoutingModule } from './family-lawyer-routing.module';
import { FamilyLawyerComponent } from './family-lawyer.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbAlertModule, NgbDatepickerModule, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotifierModule } from 'angular-notifier';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    FamilyLawyerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FamilyLawyerRoutingModule,
    NgxPaginationModule,
    NgbModule,
    NgbModalModule,
    NgxPaginationModule,
    NgbDatepickerModule,
    NgbAlertModule,
    NotifierModule,
    SharedModule
  ]
})
export class FamilyLawyerModule { }
