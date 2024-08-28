import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WordsComponent } from './words/words.component';
import { VenuesComponent } from './venues/venues.component';
import { MuslimMarriageOfficersComponent } from './muslim-marriage-officers/muslim-marriage-officers.component';
import { MarriageOfficersComponent } from '../marriage-officers/marriage-officers.component';
import { GlossaryComponent } from './glossary/glossary.component';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';


const routes: Routes = [
  {path: 'words', component:WordsComponent},
  {path: 'venues', component: VenuesComponent},
  {path: 'muslim-marriage-officer', component: MuslimMarriageOfficersComponent},
  {path: 'marriage-officers', component: MarriageOfficersComponent},
  {path: 'glossary', component:GlossaryComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
 
})
export class GuestRoutingModule { }
