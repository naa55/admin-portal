import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ApplicationRoutingModule } from './application-routing.module';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { NgbModalModule, NgbDatepickerModule, NgbTimepickerModule, NgbTooltipModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { ChatBoxComponent } from './chat-box/chat-box.component';
import { ContactsComponent } from './contacts/contacts.component';
import { EmailappComponent } from './emailapp/emailapp.component';
import { EmailReadComponent } from './emailapp/email-read/email-read.component';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { FullcalendarComponent } from './fullcalendar/fullcalendar.component';
import { DateTimePickerComponent } from './fullcalendar/date-time-picker.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { ContractorsComponent } from './contractors/contractors.component';
import { PaymentComponent } from './payment/payment.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {AutosizeModule} from 'ngx-autosize';
import { PendingComponent } from './pending/pending.component';
import { ShareModule } from '../share/share.module';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    ChatBoxComponent,
    ContactsComponent,
    EmailappComponent,
    EmailReadComponent,
    FileManagerComponent,
    InvoiceComponent,
    FullcalendarComponent,
    DateTimePickerComponent,
    ContractorsComponent,
    PaymentComponent,
    PendingComponent
  ],
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    PerfectScrollbarModule,
      CalendarModule.forRoot({
        provide: DateAdapter,
        useFactory: adapterFactory
      }),
      NgbTooltipModule,
    NgbModalModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    FormsModule,
    FontAwesomeModule,
    AutosizeModule,
    ShareModule,
    NgxPaginationModule
  ],
  providers: [    
    NgbActiveModal,
  ]
})
export class ApplicationModule { }
