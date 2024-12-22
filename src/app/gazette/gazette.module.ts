import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GazetteRoutingModule } from './gazette-routing.module';
import { GazetteComponent } from './gazette.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotifierModule } from 'angular-notifier';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [GazetteComponent],
  imports: [
    CommonModule,
    GazetteRoutingModule,
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
export class GazetteModule { }
