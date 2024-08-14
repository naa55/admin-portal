import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from "@angular/common/http";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';


import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false
};

import * as $ from 'jquery';
import { ShareModule } from '../share/share.module';
import {NgxPaginationModule} from 'ngx-pagination';
import { CategoriesComponent } from './categories.component';
import { CategoriesRoutingModule } from './categories.component-routing.module';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [
    CategoriesComponent
  ],
  imports: [
    // BrowserModule,
    // BrowserAnimationsModule,
    // NgbModule,
    // HttpClientModule,
    // NgbModule,
    // AgmCoreModule.forRoot({apiKey: 'AIzaSyDKXKdHQdtqgPVl2HI2RnUa_1bjCxRCQo4'}),
    // PerfectScrollbarModule,
    // ReactiveFormsModule,
    // FontAwesomeModule,
    CommonModule,
    ShareModule,
    CategoriesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG }
  ],
  bootstrap: []
})
export class CategoriesModule { }
