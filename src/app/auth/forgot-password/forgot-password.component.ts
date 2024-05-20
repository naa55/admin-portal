import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
// import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {


  sendEmail = new FormGroup({
    email:  new FormControl('', [
      Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")] )
  })



  
  constructor(private router: Router, 
    private route: ActivatedRoute,
     private auth: AuthService,
    //  private toast : NgToastService
     ) { }

	// On SignIn link click
	onSignIn() {

   
	  this.router.navigate(['sign-in'], { relativeTo: this.route.parent });

	}


  ngOnInit(): void {
  }


  onSubmit(e) {
    e.preventDefault()
    console.log(this.sendEmail.value)
    let payload = {email: this.sendEmail.get('email')?.value}
    console.log(payload)

    this.auth.store('/user/email-validate', payload).subscribe({
      next: async (response) => {
        // (await loading).dismiss();
        // console.log(response);

        if(response['status'] == 'success'){
          sessionStorage.setItem('ion_reseter_email', response['user_email']);
          this.router.navigateByUrl('/auth/reset-password', { replaceUrl: true});
        }

        if(response['status'] == 'failed'){
          // console.log(response['message'])
          // this.toast.error({detail: 'Error', summary:response['message'], duration: 5000})

          // this.alert.presentError(response['message']);
        }
      },
      error: async (error) => {
        // (await loading).dismiss();
        // console.log(error['error']['message'])
        // this.toast.error({detail: 'Error', summary:error['error']['message'], duration: 5000})

        // console.log(error);
      },
    });

  }

}
