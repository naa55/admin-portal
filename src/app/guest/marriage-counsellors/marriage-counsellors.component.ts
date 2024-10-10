import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-marriage-counsellors',
  templateUrl: './marriage-counsellors.component.html',
  styleUrls: ['./marriage-counsellors.component.scss'],
})
export class MarriageCounsellorsComponent {
  marriageCounsellors: any;
  constructor(private auth: AuthService) {}


  
  getMarriageCounsellors() {
    this.auth.get('/admin/categories').subscribe({
      next: (response) => {
        this.marriageCounsellors = response['glossary'];
        // console.log(response);
      },
      error: (result) => {
        // console.log(result);
      },
    });
  }
}
