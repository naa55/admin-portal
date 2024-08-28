import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-muslim-marriage-officers',
  templateUrl: './muslim-marriage-officers.component.html',
  styleUrls: ['./muslim-marriage-officers.component.scss']
})
export class MuslimMarriageOfficersComponent {
  muslimMarriageOfficers:any
  p = 1
  constructor(private auth: AuthService){
    
  }

  ngOnInit() {
    this.getMuslimMarriageOfficers()
  }

  getMuslimMarriageOfficers() {
    this.auth.get('/user/marriage-officers/muslim').subscribe({
      next: (response) => {
        this.muslimMarriageOfficers = response['officers'];
        console.log(response);
      },
      error: (result) => {
        console.log(result);
      },
    });
  }
}
