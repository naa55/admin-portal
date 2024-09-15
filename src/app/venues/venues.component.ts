import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';
import { AlertComponent } from '../shared/alert/alert.component';

@Component({
  selector: 'app-venues',
  templateUrl: './venues.component.html',
  styleUrls: ['./venues.component.scss']
})
export class VenuesComponent {
  @ViewChild('alert') alertNotifier: AlertComponent

  venueForm:FormGroup
  p:number = 1
  venuesArray:any;
  category_id: any;
  place: string = "";
  region: string = "Greater Accra";
  church: string = ""
  storeData = false
  editData = false
  venueId: any;

  constructor(private auth: AuthService,
    private modalService: NgbModal){

  }
  ngOnInit(): void {
     this.initializeForm()
     this.getAllVenues()
     
  }

  open(content){
    this.storeData = true
    this.editData = false
    this.venueForm.reset()
    this.modalService.open(content, { size: 'lg' });
  }

  initializeForm(){
      this.venueForm = new FormGroup({
        place_of_worship: new FormControl(),
        denomination: new FormControl(),
        branch: new FormControl(),
        region: new FormControl(),
        location: new FormControl(),
        license_officer: new FormControl(),
        designation: new FormControl(),
        license_date: new FormControl(),
        gazette_number: new FormControl(),
        gazette_date: new FormControl(),

      })
  }

  store(){
    
      const payload = this.venueForm.value

      this.auth.store('/admin/venues/store', payload).subscribe({
          next: (result) => {
            this.modalService.dismissAll()
            this.getAllVenues();
          },
          error: (result) => {
            console.log(result)
          }
  })
}

getAllVenues(){
  this.auth.get('/admin/venues/all').subscribe({
      next: (response) => {
          this.venuesArray = response['venues']
        console.log(response) 
      },
      error: (result) => {
        console.log(result)
      }
})
}



close() {
this.modalService.dismissAll() 
}


edit(data:any,modal){
  this.storeData = false
  this.editData = true

this.venueId = data.id

this.venueForm.patchValue(data)
this.modalService.open(modal, { size: 'lg' });

}


deleteCategory(cateogry:any){
console.log(cateogry)
const deleteId  = cateogry?.uuid
    this.auth.delete(`/admin/remove-category/${deleteId}`).subscribe({
     next: (result) => {
       this.category_id = null
       this.modalService.dismissAll()
       this.getAllVenues()
       console.log(result) 
     },
     error: (result) => {
       console.log(result)
     }
 })
}

search($event){
  console.log($event)
 }

 

 update() {
  let payload = this.venueForm.value;
  console.log(payload);
  console.log(this.venueId);

  this.auth.update(`/admin/venues/update/${this.venueId}`, payload)
    .subscribe({
      next: (result) => {
        console.log(result)
        if (result['status'] === "success") {
          this.alertNotifier.success('Updated Successfully');
          this.modalService.dismissAll()
          this.getAllVenues()
        }
      },
      error: (error) => {
        console.log(error)
      }
    })

}


deleteFromList(item) {
  console.log(item)
  this.auth.destroyUrl(`/admin/venues/remove/${item?.id}`).subscribe({
    next: (response) => {
      if (response['status'] === "success") {
        this.alertNotifier.success('Deleted Successfully');
        this.getAllVenues()
        this.modalService.dismissAll()
      }
    }
  })

}


 
 searchMarriage() {
  console.log('search')
  console.log(this.region)
  this.auth.get(`/admin/venues/filter?place=${this.place}&denomination=${this.church}&region=${this.region}`).subscribe({
    next: (response) => {
      console.log(response)
      if(response) {
        this.venuesArray = response['venues'];
      }
    }
  })
}


}
