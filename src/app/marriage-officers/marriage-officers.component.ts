import { Component, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-marriage-officers',
  templateUrl: './marriage-officers.component.html',
  styleUrls: ['./marriage-officers.component.scss']
})
export class MarriageOfficersComponent {
  @ViewChild('#exampleLargeModal') cateogoryModal

  marriageOfficerForm:FormGroup
    p:number = 1
    officers:any;
  category_id: any;

    constructor(private auth: AuthService,
      private modalService: NgbModal,
      public activeModal: NgbActiveModal){

    }
    ngOnInit(): void {
       this.initializeForm()
       this.getAllOfficers()
       
    }

    ngAfterViewInit(): void {
      console.log('cat ',this.cateogoryModal)
      //this.modalService.open()
    }

    open(content){
      this.modalService.open(content, { size: 'lg' });
    }

    initializeForm(){
        this.marriageOfficerForm = new FormGroup({
            name: new FormControl(),
            gender: new FormControl(),
            designation: new FormControl(),
            denomination: new FormControl(),
            church: new FormControl(),
            region: new FormControl(),
            location: new FormControl(),
            gazette_number: new FormControl(),
            gazette_date: new FormControl(),
            license_officer: new FormControl(),
            
            appointment_date: new FormControl(),
        })
    }

    store(){
      
        const payload = this.marriageOfficerForm.value

        this.auth.store('/admin/marriage-officers/christian/store', payload).subscribe({
            next: (result) => {
              this.modalService.dismissAll()
              this.getAllOfficers();
            },
            error: (result) => {
              console.log(result)
            }
    })
}

getAllOfficers(){
    this.auth.get('/admin/marriage-officers/all').subscribe({
        next: (response) => {
            this.officers = response['officers']
          console.log(response) 
        },
        error: (result) => {
          console.log(result)
        }
})
}

save() {
 // Perform save operation
  this.activeModal.close('Save'); 
}

close() {
  this.modalService.dismissAll() 
}

deleteCat(data:any){

}

view(data:any){

}

edit(data:any,modal){
  console.log(data)
  this.category_id = data?.id

this.marriageOfficerForm.patchValue(data)
this.open(modal)
}


deleteCategory(cateogry:any){
  console.log(cateogry)
  const deleteId  = cateogry?.uuid
      this.auth.delete(`/admin/remove-category/${deleteId}`).subscribe({
       next: (result) => {
         this.category_id = null
         this.modalService.dismissAll()
         this.getAllOfficers()
         console.log(result) 
       },
       error: (result) => {
         console.log(result)
       }
   })
 }

}
