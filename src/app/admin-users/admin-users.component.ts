import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from "../shared/alert/alert.component";
import { NgbAlertModule, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements AfterViewInit {
  @ViewChild('#exampleLargeModal') cateogoryModal
  @ViewChild('alert') alertNotifier:AlertComponent

  adminForm:FormGroup
  p:number = 1
  categoryArray:any;
  data_id: any;
 isLoading = false
 model: NgbDateStruct;

  constructor(private auth: AuthService,
    private modalService: NgbModal,){

  }

  ngAfterViewInit() {
    // Old-fashioned JavaScript in Angular
    var modal = document.getElementById("myModal") as HTMLDivElement;
    var openModalBtn = document.getElementById("openModalBtn") as HTMLButtonElement;
    var closeModalSpan = document.querySelector(".close") as HTMLSpanElement;

    // Open the modal when the button is clicked
    openModalBtn.onclick = function() {
      modal.style.display = "block";
    };

    // Close the modal when the 'x' is clicked
    closeModalSpan.onclick = function() {
      modal.style.display = "none";
    };

    // Close the modal when clicking outside the modal content
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  }
  ngOnInit(): void {
     this.initializeForm()
     this.getAllCategories()
     
  }

  // ngAfterViewInit(): void {
    
  // }

  open(content){
    this.modalService.open(content, { size: 'lg' });
  }

  initializeForm(){
      this.adminForm = new FormGroup({
          first_name: new FormControl('',Validators.required),
          last_name: new FormControl('',Validators.required),
          email:new FormControl('',Validators.required),
          phone_number: new FormControl('',Validators.required),
          role: new FormControl('',Validators.required)
      })
  }

  store(){
    this.isLoading = true
      const payload = this.adminForm.value

      this.auth.update('/admin/new', payload).subscribe({
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

update(){
  this.isLoading = true
    const payload = this.adminForm.value

    this.auth.store(`/admin/update/${this.data_id}`, payload).subscribe({
        next: (result) => {
          this.isLoading = false
          this.modalService.dismissAll()
          this.alertNotifier.success('Admin updated successfully')
          this.getAllCategories();
        },
        error: (result) => {
          this.alertNotifier.error('Failed to update admin')
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
this.data_id = data?.uuid
this.open(context)
this.adminForm.patchValue(data)

}


deleteCategory(cateogry:any){
console.log(cateogry)
const deleteId  = cateogry?.uuid
    this.auth.get(`/admin/remove/${deleteId}`).subscribe({
     next: (result) => {
       this.data_id = null
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
  this.data_id = null
  this.adminForm.reset()
this.modalService.dismissAll()
}

search($event){
  console.log($event)
 }

}
