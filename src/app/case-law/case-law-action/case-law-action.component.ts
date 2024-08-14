import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-case-law-action',
  templateUrl: './case-law-action.component.html',
  styleUrls: ['./case-law-action.component.scss']
})
export class CaseLawActionComponent {
  caseLawGroup:FormGroup
  base64File:any
  @Input() categories:[] =[]


  ngOnInit() {
    this.initialiseForm()
  }

  initialiseForm(){
    this.caseLawGroup = new FormGroup({
      case_title: new FormControl(),
      case_law: new FormControl(),
      summary: new FormControl(),
      category_id: new FormControl(),
      court: new FormControl(),
      case_file: new FormControl(),
    })
}

onFileChange(event: any) {
  const reader = new FileReader();
  const file = event.target.files[0];

  reader.onloadend = () => {
   this.base64File = reader.result;
    // You can now use the base64String for further processing
 //nsole.log(base64String);
  };

  reader.readAsDataURL(file);
}

store(){
  
}


}
