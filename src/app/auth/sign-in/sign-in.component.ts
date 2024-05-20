import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForms = new FormGroup({
    email: new FormControl('',
    [
      Validators.required,
      
    Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]
     ),
    password: new FormControl('',  Validators.required)
  })

    constructor(
      private router: Router,
       private route: ActivatedRoute,
       private auth: AuthService
       
       ) { }

    // On Forgotpassword link click
    onForgotpassword() {
      this.router.navigate(['forgot-password'], { relativeTo: this.route.parent });
    }
  
    // On Signup link click
    onSignup() {
      this.router.navigate(['sign-up'], { relativeTo: this.route.parent });
    }
  

  ngOnInit(): void {
  }

  signIn(e) {
    console.log(this.signInForms.value)
    let payload = {
      email: this.signInForms?.get('email')?.value,
      password: this.signInForms?.get('password')?.value,
      user_role: 'shipper'
    }

    console.log(payload)

    this.auth.store('/user/login', payload).subscribe({
      next: (response: any) => {

        if (response['status'] === 'failed') {
          // this.toast.error({ detail: 'Error', summary: response['message'], duration: 5000 })
          console.log(response)
          // this.isLoading = false

        } else {
          // this.isLoading = false
          sessionStorage.setItem('token', response['token']);
          sessionStorage.setItem('userData', JSON.stringify(response['user']));
          console.log(response['user'])
          sessionStorage.setItem('userRole', response['login_as']);
          // this.userRole = response['login_as'];
          this.router.navigateByUrl('/dashboard/default', { replaceUrl: true });

          // if (this.userRole == 'shipper') {
          //   sessionStorage.setItem('shipping_address', JSON.parse(response['user']['shipper_details'][0]['address']));
          //   this.router.navigateByUrl('/full/dashboard/default', { replaceUrl: true });
          // } else {
          //   this.router.navigateByUrl('/full/dashboard/alternate', { replaceUrl: true });
          // }
        }

      },
      error: (error) => {
       
        console.log(error.error.message)
        // this.toast.error({ detail: 'Error', summary: error.error.message, duration: 5000 })


        if (error.error.errors['email']) {
          // this.toast.error({ detail: 'Error', summary: error.error.errors['email'][0], duration: 5000 })
          console.log(error.error.errors['email'][0])
        } else if (error.error.errors['password']) {
          // this.toast.error({ detail: 'Error', summary: error.error.errors['password'][0], duration: 5000 })

          console.log(error.error.errors['password'][0])
        } else {
          // this.toast.error({ detail: 'Error', summary: error.error.errors['message'], duration: 5000 })

        }
      }
    });
  }

}
