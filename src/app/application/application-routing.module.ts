import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContractorsComponent } from './contractors/contractors.component';
import { EmailReadComponent } from './emailapp/email-read/email-read.component';
import { EmailappComponent } from './emailapp/emailapp.component';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { FullcalendarComponent } from './fullcalendar/fullcalendar.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { PaymentComponent } from './payment/payment.component';
import { PendingComponent } from './pending/pending.component';

const routes: Routes = [
    {
      path: '',
      children: [
        {
          path: 'email-app',
          component: EmailappComponent,
          data: {
            title: 'Email App'
          }
        },
        {
          path: 'email-read',
          component: EmailReadComponent,
          data: {
            title: 'Email Read'
          }
        },
        {
          path: 'chat-box',
          component: ChatBoxComponent,
          data: {
            title: 'Chat Box'
          }
        },
        {
          path: 'file-manager',
          component: FileManagerComponent,
          data: {
            title: 'File Manager'
          }
        },
        {
          path: 'contatcs',
          component: ContactsComponent,
          data: {
            title: 'Contatcs'
          }
        },
        {
          path: 'invoice',
          component: InvoiceComponent,
          data: {
            title: 'Invoice'
          }
        },
        {
          path: 'calendar',
          component: FullcalendarComponent,
          data: {
            title: 'calendar'
          }
        },
        {
          path: 'contractors',
          component: PendingComponent,
          data: {
            title: 'contractors'
          }
        },
        {
          path: 'payment',
          component: PaymentComponent,
          data: {
            title: 'payment'
          }
        },
        {
          path: 'pending',
          component: ContractorsComponent,
          data: {
            title: 'pending'
          }
        },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
