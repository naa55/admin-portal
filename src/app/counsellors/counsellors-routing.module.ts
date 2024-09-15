import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounsellorsComponent } from './counsellors.component';

const routes: Routes = [
  {
    path: '',
    component: CounsellorsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CounsellorsRoutingModule { }
