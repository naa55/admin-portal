import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from "../shared/alert/alert.component";

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent {
  @ViewChild('#exampleLargeModal') cateogoryModal
  @ViewChild('alert') alertNotifier:AlertComponent

  categoriesForm:FormGroup
  p:number = 1
  categoryArray:any;
 category_id: any;
 isLoading = false

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
          first_name: new FormControl('',Validators.required),
          last_name: new FormControl('',Validators.required),
          email:new FormControl('',Validators.required),
          phone_number: new FormControl('',Validators.required),
          role: new FormControl('',Validators.required)
      })
  }

  store(){
    this.isLoading = true
      const payload = this.categoriesForm.value

      this.auth.store('/admin/new', payload).subscribe({
          next: (result) => {
            this.isLoading = false
            this.modalService.dismissAll()
            this.alertNotifier.success('Admin added successfully')
            this.getAllCategories();
          },
          error: (result) => {
            this.alertNotifier.error('Failed to add admin')
            this.isLoading = false
           
          }
  })
}

getAllCategories(){
  this.auth.get('/admin/all').subscribe({
      next: (response) => {
          this.categoryArray = response['admins']

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
this.category_id = data?.uuid
this.open(context)
this.categoriesForm.patchValue(data)

}


deleteCategory(cateogry:any){
console.log(cateogry)
const deleteId  = cateogry?.uuid
    this.auth.delete(`/admin/remove-category/${deleteId}`).subscribe({
     next: (result) => {
       this.category_id = null
       this.modalService.dismissAll()
       this.getAllCategories()
      this.alertNotifier.success('Admin deleted successfully')
     },
     error: (result) => {
      this.alertNotifier.error('Failed to delete')
     }
 })
}

close(){
  this.category_id = null
  this.categoriesForm.reset()
this.modalService.dismissAll()
}

search($event){
  console.log($event)
 }

}
