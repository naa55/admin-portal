import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarriageOfficersRoutingModule } from './marriage-officers-routing.module';
import { MarriageOfficersComponent } from './marriage-officers.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbActiveModal, NgbDatepickerModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    MarriageOfficersComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    NgbDatepickerModule,
    NgbAlertModule,
    MarriageOfficersRoutingModule,
    SharedModule
  ],
  providers: [NgbActiveModal]
})
export class MarriageOfficersModule { }
