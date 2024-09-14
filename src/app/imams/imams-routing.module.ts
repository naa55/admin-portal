import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImamsComponent } from './imams.component';

const routes: Routes = [
  {
    path: '',
    component: ImamsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImamsRoutingModule { }
