import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VenuesComponent } from './venues.component';

const routes: Routes = [
  {path: '', component:VenuesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VenuesRoutingModule { }
