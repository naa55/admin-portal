import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestMarriageOfficersComponent } from './marriage-officers/marriage-officers.component';
import { MuslimMarriageOfficersComponent } from './muslim-marriage-officers/muslim-marriage-officers.component';
import { VenuesComponent } from './venues/venues.component';
import { MarriageCounsellorsComponent } from './marriage-counsellors/marriage-counsellors.component';
import { WordsComponent } from './words/words.component';
import { GuestRoutingModule } from './guest-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ShareModule } from '../share/share.module';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { GlossaryComponent } from './glossary/glossary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GuestMarriageOfficersComponent,
    MuslimMarriageOfficersComponent,
    VenuesComponent,
    MarriageCounsellorsComponent,
    WordsComponent,
    GlossaryComponent
  ],
  imports: [
    CommonModule,
    GuestRoutingModule,
    ShareModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: PERFECT_SCROLLBAR_CONFIG }
  ],
})
export class GuestModule { }
