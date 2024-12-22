import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatutesComponent } from './statutes.component';

const routes: Routes = [
  {
    path:"",
    component: StatutesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatutesRoutingModule { }
