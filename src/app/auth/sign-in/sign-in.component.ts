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
  UserType = {
    Guest: 2,
    Admin: 1
  }

  selectedUser = 2
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

    let url  = this.selectedUser == this.UserType.Guest ? '/auth/login':'/admin/auth/login'
    let payload = {
      email: this.signInForms?.get('email')?.value,
      password: this.signInForms?.get('password')?.value,
    }


    this.auth.store(url, payload).subscribe({
      next: (response: any) => {

        console.log(response)

        if (response['status'] === 'failed') {
      
        } else {
          
          sessionStorage.setItem('token', response['token']);
          if(this.selectedUser == this.UserType.Guest){
            sessionStorage.setItem('userData', JSON.stringify(response['user']));
            sessionStorage.setItem('role', 'user')
          }else{
            sessionStorage.setItem('userData', JSON.stringify(response['admin']));
          }
         
           this.router.navigateByUrl('/dashboard/default', { replaceUrl: true });
        }

      },
      error: (error) => {
       console.log(error);
        if (error.error.errors['email']) {

        } else if (error.error.errors['password']) {
         

          console.log(error.error.errors['password'][0])
        } else {
          

        }
      }
    });
  }
  

  selectUser(userType){
    this.selectedUser = userType
  }

}
