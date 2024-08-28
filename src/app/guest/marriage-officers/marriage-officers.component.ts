import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-marriage-officers',
  templateUrl: './marriage-officers.component.html',
  styleUrls: ['./marriage-officers.component.scss']
})
export class MarriageOfficersComponent {
  marriageOfficers:any
  p = 1
  constructor(private auth: AuthService){
    
  }

  ngOnInit() {
    this.getMarriageOfficers()
  }

  getMarriageOfficers() {
    this.auth.get('/user/marriage-officers').subscribe({
      next: (response) => {
        this.marriageOfficers = response['officers'];
        console.log(response);
      },
      error: (result) => {
        console.log(result);
      },
    });
  }


}
