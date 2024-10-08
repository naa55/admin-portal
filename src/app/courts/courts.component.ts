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

    categoriesForm:FormGroup
    p:number = 1
    categoryArray:any;
  category_id: any;
  model: NgbDateStruct;

    constructor(private auth: AuthService,
      private modalService: NgbModal,){

    }
    ngOnInit(): void {
       this.initializeForm()
       this.getAllCategories()
       
    }

    ngAfterViewInit(): void {
      
    }

    open(content){
      this.modalService.open(content, { size: 'lg' });
    }

    initializeForm(){
        this.categoriesForm = new FormGroup({
          court: new FormControl('',Validators.required),
          description: new FormControl('',Validators.required),
          category: new FormControl('',Validators.required),
        })
    }

    store(){
      
        const payload = this.categoriesForm.value

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
    this.auth.get('/admin/courts/all').subscribe({
        next: (response) => {
            this.categoryArray = response['courts']
          console.log(response) 
        },
        error: (result) => {
          console.log(result)
        }
})
}

deleteCat(data:any){

}

view(data:any){

}

edit(data:any,context){
  this.category_id = data?.uuid
  this.categoriesForm.patchValue(data)
  this.open(context)

}


deleteCategory(cateogry:any){
  console.log(cateogry)
  const deleteId  = cateogry?.uuid
      this.auth.delete(`/admin/remove-category/${deleteId}`).subscribe({
       next: (result) => {
         this.category_id = null
         this.modalService.dismissAll()
        
         this.alertNotifier.success('Court deleted successfully')
         this.getAllCategories()
       },
       error: (result) => {
        this.alertNotifier.error('Court deleted successfully')
       }
   })
 }

 close(){
  this.modalService.dismissAll()
}



search($event){
  console.log($event)
 }

 update(){
      
  const payload = this.categoriesForm.value

  this.auth.store(`/admin/courts/update/${this.category_id}`, payload).subscribe({
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
