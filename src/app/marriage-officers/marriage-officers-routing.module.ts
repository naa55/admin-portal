import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarriageOfficersComponent } from './marriage-officers.component';

const routes: Routes = [
  {path: '', component:MarriageOfficersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarriageOfficersRoutingModule { }
