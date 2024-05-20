import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetForms: FormGroup;
  userEmail: any;
  userRole: any;

  constructor(
    private router: Router,
     private route: ActivatedRoute,
     private formBuilder: FormBuilder,
     private auth: AuthService,
    //  private toast : NgToastService
    ) {
    this.getMail();
    this.buildForms();
   }


	// On Login link click
	onLogin() {
	  this.router.navigate(['sign-in'], { relativeTo: this.route.parent });
	}


  ngOnInit(): void {
  }

  
  async getMail(){
    this.userEmail =  sessionStorage.getItem('ion_reseter_email');
    this.userRole =  sessionStorage.getItem('ion_userRole');
    if(!this.userEmail){
      alert('Email not available, Try again.')
      this.router.navigateByUrl('/forgot-password', { replaceUrl: true});
    }
  }


  buildForms(){
    this.resetForms = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength]],
      password_confirmation: ['', [Validators.required, Validators.minLength]],
      password_reset_code:  ['', [Validators.required]],
    });
  }

  matchPasswords(){
    let pass = this.resetForms.controls['password'].value;
    let cpass = this.resetForms.controls['password_confirmation'].value;

    if(pass === cpass){
      return true ;
    }else{
      return false;
    }
  }

  async changePassword(){


    let payload = {
      email: this.userEmail,
      password: this.resetForms.controls['password'].value,
      password_confirmation: this.resetForms.controls['password_confirmation'].value,
      password_reset_code: this.resetForms.controls['password_reset_code'].value,
    }

    console.log(payload)

    // this.auth.store('/user/reset_password', payload).subscribe({
    //   next: async (response) => {
       

    //     if(response['status'] == 'success'){
    //       alert(response['message']);
    //       sessionStorage.removeItem('ion_reseter_email');
    //       this.router.navigateByUrl('/signin', {replaceUrl: true});

    //     }else{
    //       // this.toast.error({detail: 'Error', summary:response['message'], duration: 5000})

    //     }
    //   },
    //   error: async (error) => {
    //     // this.toast.error({detail: 'Error', summary:error['error']['message'], duration: 5000})

    //   },
    // });
  }
}
