import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CouncellorsComponent } from './councellors.component';

const routes: Routes = [
  {path: '', component:CouncellorsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CouncellorsRoutingModule { }
