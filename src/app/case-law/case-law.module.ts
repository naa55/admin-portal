import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaseLawActionComponent } from './case-law-action/case-law-action.component';
import { CaseLawRoutingModule } from './case-law-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CaseLawComponent } from './case-law.component';
import { NgbActiveModal, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CaseLawActionComponent,
    CaseLawComponent
  ],

  imports: [CaseLawRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgxPaginationModule,
    NgbModule,
    NgbModalModule,
    SharedModule
  ],
  providers: [NgbActiveModal]
})
export class CaseLawModule { }
