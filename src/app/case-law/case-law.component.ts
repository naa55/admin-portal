import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { SpinnerService } from '../services/loader.service';
import Swal from 'sweetalert2';

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from '../shared/alert/alert.component';



@Component({
  selector: 'app-case-law',
  templateUrl: './case-law.component.html',
  styleUrls: ['./case-law.component.scss']
})
export class CaseLawComponent {
  @ViewChild('alert') alertNotifier:AlertComponent
  p: number = 1;
  users: []
  caseLawGroup:FormGroup
  base64File:any
  categories:[]=[]
  casesArray: any;
  case_id: any;
  isLoading = false
  courtsArray:any
  title: string = "";
  court: string =  "";
  
 

  constructor( private auth: AuthService, private spinner: SpinnerService, private modalService: NgbModal,
    public activeModal: NgbActiveModal){
    this.initialiseForm()
  }

  ngOnInit() {
    // this.service.show()
    this.getCategories()
    this.getAllCases()
    this.getAllCourts()
      
  }
  

  initialiseForm(){
    this.caseLawGroup = new FormGroup({
      case_title: new FormControl('',Validators.required),
      case_law: new FormControl('',Validators.required),
      summary: new FormControl('',Validators.required),
      category_id: new FormControl('',Validators.required),
      court: new FormControl('',Validators.required),
      case_file: new FormControl(''),
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
        this.modalService.dismissAll()
        
      },
      error: (result) => {
        this.isLoading = false
        this.modalService.dismissAll()
       
      }
  })
}

onFileChange(event: any) {
  const reader = new FileReader();
  const file = event.target.files[0];

  reader.onloadend = () => {
   this.base64File = reader.result;
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
  this.spinner.show()
  this.auth.get('/admin/categories').subscribe({
    next: (response) => {
      this.categories = response['categories']
      this.spinner.hide()
    },
    error: (error) => {
      this.spinner.hide()
    }
  })
}

edit(category:any,context){
  this.open(context)
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
        this.modalService.dismissAll()
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

getAllCourts(){
  this.auth.get('/admin/courts/all').subscribe({
      next: (response) => {
          this.courtsArray = response['courts']
        console.log(response) 
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

open(content){
  this.caseLawGroup.reset()
  this.modalService.open(content, { size: 'lg' });
}

close(){
  this.caseLawGroup.reset()
  this.case_id = null
  this.modalService.dismissAll()
}

searchCase() {
   console.log('search')
    this.auth.get(`/admin/case-law/filter?title=${this.title}&court=${this.court}`).subscribe({
      next: (response) => {
        console.log(response)
        if(response) {
          this.casesArray = response['caseLaws']
        }
      }
    })
}
}
