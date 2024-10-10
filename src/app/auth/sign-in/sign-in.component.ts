import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  @ViewChild('alert') alertNotifier:AlertComponent
  UserType = {
    Guest: 2,
    Admin: 1
  }
  isLoading = false

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
    this.isLoading = true
    // let url  = this.selectedUser == this.UserType.Guest ? '/auth/login':'/admin/auth/login'
    let url = '/admin/auth/login'
    let payload = {
      email: this.signInForms?.get('email')?.value,
      password: this.signInForms?.get('password')?.value,
    }


    this.auth.store(url, payload).subscribe({
      next: (response: any) => {
        this.isLoading = false
        console.log(response);

        if (response['status'] === 'failed') {
          this.alertNotifier.error('Invalid credentials')
        } else {
          
          sessionStorage.setItem('token', response['token']);
          // if(this.selectedUser == this.UserType.Guest){
          //   sessionStorage.setItem('userData', JSON.stringify(response['user']));
          //   sessionStorage.setItem('role', 'user')
          // }else{
          //   sessionStorage.setItem('userData', JSON.stringify(response['admin']));
          // }

          sessionStorage.setItem('userData', JSON.stringify(response['admin']));

         
           this.router.navigateByUrl('/dashboard/default', { replaceUrl: true });
        }

      },
      error: (error) => {
        this.isLoading = false
        this.alertNotifier.error('Invalid credentials')
        // if (error.error.errors['email']) {

        // } else if (error.error.errors['password']) {
         

        //   console.log(error.error.errors['password'][0])
        // } 
      }
    });
  }
  

  selectUser(userType){
    this.selectedUser = userType
  }

}
