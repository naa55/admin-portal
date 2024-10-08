import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LockScreenComponent } from './lock-screen/lock-screen.component';
import { SigninWithHeaderFooterComponent } from './signin-with-header-footer/signin-with-header-footer.component';
import { SignupWithHeaderFooterComponent } from './signup-with-header-footer/signup-with-header-footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormModule } from '../form/form.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    SignInComponent, 
    SignUpComponent,
    ForgotPasswordComponent, 
    ResetPasswordComponent, 
    LockScreenComponent, 
    SigninWithHeaderFooterComponent,
    SignupWithHeaderFooterComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormModule,
    SharedModule,
  ]
})
export class AuthModule { }
