import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-venues',
  templateUrl: './venues.component.html',
  styleUrls: ['./venues.component.scss']
})
export class VenuesComponent {

  venuesArray:any
  p = 1
  constructor(private auth: AuthService){
    
  }
 

  ngOnInit(){
    this.getVenues()
  }

  getVenues() {
    this.auth.get('/user/venues/all').subscribe({
      next: (response) => {
        this.venuesArray = response['venues'];
        console.log(response);
      },
      error: (result) => {
        console.log(result);
      },
    });
  }
}
