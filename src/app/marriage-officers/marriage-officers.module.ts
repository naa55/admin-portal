import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarriageOfficersRoutingModule } from './marriage-officers-routing.module';
import { MarriageOfficersComponent } from './marriage-officers.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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
    MarriageOfficersRoutingModule
  ],
  providers: [NgbActiveModal]
})
export class MarriageOfficersModule { }
