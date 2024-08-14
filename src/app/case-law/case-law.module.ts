import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaseLawActionComponent } from './case-law-action/case-law-action.component';
import { CaseLawRoutingModule } from './case-law-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CaseLawComponent } from './case-law.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


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
    NgbModule
  ]
})
export class CaseLawModule { }
