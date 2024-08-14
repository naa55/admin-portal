import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CaseLawActionComponent } from './case-law-action/case-law-action.component';
import { CaseLawComponent } from './case-law.component';
//import { UserManagementComponent } from './user-management.component';

const routes: Routes = [
  {
    path: '',
    component: CaseLawComponent,
    // children: [
    //   {
    //     path: 'users',
    //     component: UserManagementComponent,
        
    //   },
   
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaseLawRoutingModule { }
