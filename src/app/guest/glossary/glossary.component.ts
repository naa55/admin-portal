import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-glossary',
  templateUrl: './glossary.component.html',
  styleUrls: ['./glossary.component.scss']
})
export class GlossaryComponent {
  glossaryArray:any
  p = 1

  constructor(private auth: AuthService){
    
  }

  ngOnInit(){
    this.getAllGlossary()
  }

  getAllGlossary(){
    let glossaryObj = {
      "page": 1,
      "order": "asc",
      "alphabet": "a"
    }
    this.auth.store('/general/words',glossaryObj).subscribe({
        next: (response) => {
            this.glossaryArray = response['words']
          console.log(response) 
        },
        error: (result) => {
          console.log(result)
        }
})
}
}
