import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VenuesRoutingModule } from './venues-routing.module';
import { VenuesComponent } from './venues.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    VenuesComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    VenuesRoutingModule
  ]
})
export class VenuesModule { }
