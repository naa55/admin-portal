import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from "../shared/alert/alert.component";

@Component({
    selector: 'app-users',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss']
  })
  export class CategoriesComponent implements OnInit {
    @ViewChild('#exampleLargeModal') cateogoryModal
    @ViewChild('alert') alertNotifier:AlertComponent

    categoriesForm:FormGroup
    p:number = 1
    categoryArray:any;
    category_id: any;
    storeData = false
    editData = false

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
      this.storeData = true
      this.editData = false
      this.categoriesForm.reset()
      this.modalService.open(content, { size: 'lg' });
    }

    initializeForm(){
      this.categoriesForm = new FormGroup({
        title: new FormControl('', Validators.required),
        slug: new FormControl('', Validators.required)
      });
    }

    store(){
      
        const payload = this.categoriesForm.value

        this.auth.store('/admin/create-category', payload).subscribe({
            next: (result) => {
              this.modalService.dismissAll()
              this.getAllCategories();
              this.alertNotifier.success('Category created successfully')
            },
            error: (result) => {
              this.alertNotifier.error('Error creating category')
            }
    })
}

getAllCategories(){
    this.auth.get('/admin/categories').subscribe({
        next: (response) => {
            this.categoryArray = response['categories']
     
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
  this.storeData = false
  this.editData = true
  this.category_id = null
  this.categoriesForm.reset()
  this.category_id = data?.uuid

  this.modalService.open(context, { size: 'lg' });
  this.categoriesForm.patchValue(data)

}

update() {
  let payload = this.categoriesForm.value;
  // console.log(payload);
  // console.log(this.venueId);

  this.auth.update(`/admin/update-category/${this.category_id}`, payload)
    .subscribe({
      next: (result) => {
        // console.log(result)
        if (result['status'] === "success") {
          this.alertNotifier.success('Updated Successfully');
          this.modalService.dismissAll()
          this.getAllCategories()
        }
      },
      error: (error) => {
        console.log(error)
      }
    })

}



deleteCategory(cateogry:any){
  const deleteId  = cateogry?.uuid
      this.auth.delete(`/admin/remove-category/${deleteId}`).subscribe({
       next: (result) => {
         this.category_id = null
         this.modalService.dismissAll()
         this.getAllCategories()
         this.alertNotifier.success('Category deleted successfully')
       },
       error: (result) => {
        this.getAllCategories()
        // this.alertNotifier.success('Failed to delete category')
        this.modalService.dismissAll()

       }
   })
 }

 close(){
  this.modalService.dismissAll()
  this.storeData = false
this.editData = false
}

search($event){
  console.log($event)
 }

  }
  