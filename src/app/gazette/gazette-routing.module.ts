import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GazetteComponent } from './gazette.component';

const routes: Routes = [
  {
    path:"",
    component: GazetteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GazetteRoutingModule { }
