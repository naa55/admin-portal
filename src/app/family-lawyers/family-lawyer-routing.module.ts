import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FamilyLawyerComponent } from './family-lawyer.component';

const routes: Routes = [
  {path: '', component:FamilyLawyerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FamilyLawyerRoutingModule { }
