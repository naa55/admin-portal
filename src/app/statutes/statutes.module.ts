import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatutesRoutingModule } from './statutes-routing.module';
import { StatutesComponent } from './statutes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbActiveModal, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotifierModule } from 'angular-notifier';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    StatutesComponent
  ],
  imports: [
    CommonModule,
    StatutesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgbModule,
    NgbModalModule,
    NotifierModule,
    SharedModule
  ],
  providers: [NgbActiveModal]

})
export class StatutesModule { }
