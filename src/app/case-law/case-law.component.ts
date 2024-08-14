import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { SpinnerService } from '../services/loader.service';



@Component({
  selector: 'app-case-law',
  templateUrl: './case-law.component.html',
  styleUrls: ['./case-law.component.scss']
})
export class CaseLawComponent {

  p: number = 1;
  users: []
  caseLawGroup:FormGroup
  base64File:any
  categories:[]=[]
  casesArray: any;
  case_id: any;
  isLoading = true
  
 

  constructor( private auth: AuthService){
    this.initialiseForm()
  }

  ngOnInit() {
    // this.service.show()
    this.getCategories()
    this.getAllCases()
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

  store(){
    this.isLoading = true
    let payload = this.caseLawGroup.value
    payload['case_file'] = this.base64File
    payload['case_law'] = 'First human law'
   
     this.auth.store('/admin/case-law/store', payload).subscribe({
      next: (result) => {
        this.isLoading = false
        console.log(result) 
      },
      error: (result) => {
        this.isLoading = false
        console.log(result)
      }
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

getAllCases(){
  this.auth.get('/admin/case-law/all').subscribe({
      next: (response) => {
          this.casesArray = response['case_laws']
       
        console.log(response) 
      },
      error: (result) => {
        console.log(result)
      }
})
}

getCategories(){
  this.auth.get('/admin/categories').subscribe({
    next: (response) => {
      this.categories = response['categories']

      console.log(response);
    },
    error: (error) => {

      console.log(error);
    }
  })
}

edit(category:any){
  this.case_id = category?.uuid
  console.log(category)
  this.caseLawGroup.patchValue(category)

}

update(){
  this.isLoading = true
  let payload = this.caseLawGroup.value
    payload['case_file'] = this.base64File
    payload['case_law'] = 'First human law'
    payload['case_id'] =  this.case_id
   
     this.auth.store('/admin/case-law/update', payload).subscribe({
      next: (result) => {
        this.case_id = null
        this.isLoading = false
        console.log(result) 
      },
      error: (result) => {
        console.log(result)
        this.isLoading = false
      }
  })
}

delete(id:string){
 const deleteId  = id
   
     this.auth.delete(`/admin/case-law/remove/${deleteId}`).subscribe({
      next: (result) => {
        this.case_id = null
        console.log(result) 
      },
      error: (result) => {
        console.log(result)
      }
  })
}

addCase(){
  this.caseLawGroup.reset()
  this.case_id = null
}
}
