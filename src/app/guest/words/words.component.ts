import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.scss']
})
export class WordsComponent {

  wordsArray:any
  p = 1
  wordsForm:FormGroup
  constructor(private auth: AuthService,private modalService: NgbModal){
    
  }

  ngOnInit() {
    this.getWords()
    this.initializeForm()
  }

  getWords() {
    this.auth.get('/guest/active-word').subscribe({
      next: (response) => {
        this.wordsArray = response['glossary'];
        // console.log(response);
      },
      error: (result) => {
        // console.log(result);
      },
    });
  }

  initializeForm(){
    this.wordsForm = new FormGroup({
        word: new FormControl('',Validators.required),
        source: new FormControl('',Validators.required),
        meaning: new FormControl('',Validators.required),
        related_terms: new FormControl('',Validators.required),
    })
}

open(data,content){
  this.wordsForm.reset()
  this.wordsForm.patchValue(data)
  this.modalService.open(content, { size: 'lg' });
}

close(){
  
}
}