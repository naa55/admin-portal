import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GazetteRequestRoutingModule } from './gazette-request-routing.module';
import { GazetteRequestComponent } from './gazette-request.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotifierModule } from 'angular-notifier';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    GazetteRequestComponent
  ],
  imports: [
    CommonModule,
    GazetteRequestRoutingModule,
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
export class GazetteRequestModule { }
