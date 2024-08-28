import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.scss']
})
export class WordsComponent {

  wordsArray:any
  constructor(private auth: AuthService){
    
  }

  getVenues() {
    this.auth.get('/admin/categories').subscribe({
      next: (response) => {
        this.wordsArray = response['glossary'];
        console.log(response);
      },
      error: (result) => {
        console.log(result);
      },
    });
  }
}
