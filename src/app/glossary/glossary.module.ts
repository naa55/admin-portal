import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlossaryRoutingModule } from './glossary-routing.module';
import { GlossaryComponent } from '../glossary/glossary.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotifierModule } from 'angular-notifier';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    GlossaryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GlossaryRoutingModule,
    NgxPaginationModule,
    NgbModule,
    NgbModalModule,
    NotifierModule,
    SharedModule
  ]
})
export class GlossaryModule { }
