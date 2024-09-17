import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from '../shared/alert/alert.component';

@Component({
  selector: 'app-courts',
  templateUrl: './courts.component.html',
  styleUrls: ['./courts.component.scss']
})
export class CourtsComponent {
  @ViewChild('#exampleLargeModal') cateogoryModal
  @ViewChild('alert') alertNotifier:AlertComponent

    courtForm:FormGroup
    p:number = 1
    categoryArray:any;
    courtsArray:any
    court_id: any;
    model: NgbDateStruct;

    constructor(private auth: AuthService,
      private modalService: NgbModal,){

    }
    ngOnInit(): void {
       this.initializeForm()
       this.getAllCategories()
       this.getAllCourts()
       
    }

    ngAfterViewInit(): void {
      
    }

    open(content){
      this.modalService.open(content, { size: 'lg' });
    }

    initializeForm(){
        this.courtForm = new FormGroup({
          court: new FormControl('',Validators.required),
          description: new FormControl('',Validators.required),
          category: new FormControl('',Validators.required),
        })
    }

    store(){
      
        const payload = this.courtForm.value

        this.auth.store('/admin/courts/store', payload).subscribe({
            next: (result) => {
              this.modalService.dismissAll()
              this.getAllCategories();
              this.alertNotifier.success('Court created successfully')
            },
            error: (result) => {
              this.alertNotifier.error('Error creating court')
            }
    })
}

getAllCategories(){
    this.auth.get('/admin/categories').subscribe({
        next: (response) => {
            this.categoryArray = response['categories']
         
        },
        error: (result) => {
         
        }
})
}

getAllCourts(){
  this.auth.get('/admin/courts/all').subscribe({
      next: (response) => {
          this.courtsArray = response['courts']
  
      },
      error: (result) => {
       
      }
})
}

deleteCat(data:any){

}

view(data:any){

}

edit(data:any,context){
  this.court_id = data?.uuid
  this.courtForm.patchValue(data)
  this.open(context)

}


deleteCourt(data:any){
  
  const deleteId  = data?.uuid
      this.auth.delete(`/admin/courts/remove/${deleteId}`).subscribe({
       next: (result) => {
         this.court_id = null
         this.modalService.dismissAll()
        
         this.alertNotifier.success('Court deleted successfully')
         this.ngOnInit()
       },
       error: (result) => {
        this.alertNotifier.error('Court deleted successfully')
       }
   })
 }

 close(){
  this.modalService.dismissAll()
  this.courtForm.reset()
}



search($event){
  console.log($event)
 }

 update(){
      
  const payload = this.courtForm.value

  this.auth.store(`/admin/courts/update/${this.court_id}`, payload).subscribe({
      next: (result) => {
        this.modalService.dismissAll()
        this.getAllCategories();
        this.alertNotifier.success('Court updated successfully')
      },
      error: (result) => {
        this.alertNotifier.error('Error updated court')
      }
})
}
}
