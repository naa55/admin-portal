import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GazetteRequestComponent } from './gazette-request.component';

const routes: Routes = [
  {
    path: '',
    component: GazetteRequestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GazetteRequestRoutingModule { }
