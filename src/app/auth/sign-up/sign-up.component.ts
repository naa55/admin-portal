import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private auth: AuthService) { }

  // On Signup link click
  registrationForm:FormGroup
  onSignIn() {
    this.router.navigate(['sign-in'], { relativeTo: this.route.parent });
  }

  ngOnInit(): void {
    this.initializeForm()
  }


  initializeForm(){
    this.registrationForm = new FormGroup({
      first_name: new FormControl(),
      last_name: new FormControl,
      email: new FormControl(),
      phone_number: new FormControl(),
      organization: new FormControl(),
      password: new FormControl(),
      password_confirmation: new FormControl()
    })
  }

  signUp(){
  let url = '/auth/register'
  this.auth.register(url,this.registrationForm.value).subscribe({
    next: (response) => {
      console.log(response)
      sessionStorage.setItem('token', response['token']);
      sessionStorage.setItem('userData', JSON.stringify(response['user']));
      this.router.navigateByUrl('/dashboard/default', { replaceUrl: true });
    },
    error: (response) => {
      console.log(response)
    }
  })
  }

}
