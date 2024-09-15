import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';
import { AlertComponent } from '../shared/alert/alert.component';
import * as moment from 'moment';

@Component({
  selector: 'app-venues',
  templateUrl: './venues.component.html',
  styleUrls: ['./venues.component.scss']
})
export class VenuesComponent {
  @ViewChild('alert') alertNotifier:AlertComponent
  venueForm:FormGroup
  p:number = 1
  officers:any;
category_id: any;
isLoading = false

  constructor(private auth: AuthService,
    private modalService: NgbModal){

  }
  ngOnInit(): void {
     this.initializeForm()
     this.getAllVenues()
     
  }

  open(content){
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
   this.isLoading = true
      const payload = this.venueForm.value

      this.auth.store('/admin/venues/store', payload).subscribe({
          next: (result) => {
            this.alertNotifier.success('Venue was successfully stored')
            this.modalService.dismissAll()
            this.getAllVenues();
            this.isLoading = false
          },
          error: (result) => {
            this.alertNotifier.error('Venue was not successfully ')
            console.log(result)
            this.isLoading = false
          }
  })
}

getAllVenues(){
  this.auth.get('/admin/venues/all').subscribe({
      next: (response) => {
          this.officers = response['venues']
        console.log(response) 
      },
      error: (result) => {
        console.log(result)
      }
})
}



close() {
  this.category_id = null;
this.modalService.dismissAll() 
}

deleteCat(data:any){

}

view(data:any){

}

edit(data:any,modal){
console.log(data)
this.category_id = data?.id

this.venueForm.patchValue(data)
console.log(moment(data?.license_date,'YYYY-MMM-DD').format('DD/MM/YYYY'));

this.venueForm.controls['license_date'].setValue(moment(data?.license_date,'YYYY-MMM-DD').format('YYYY-MM-DD'));
this.venueForm.controls['gazette_date'].setValue(moment(data?.gazette_date,'YYYY-MMM-DD').format('YYYY-MM-DD'))
this.modalService.open(modal, { size: 'lg' });

}


deleteCategory(cateogry:any){
console.log(cateogry)
const deleteId  = cateogry?.id
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

 update(){
  const payload = this.venueForm.value

  this.auth.store(`/admin/venues/update/${this.category_id}`, payload).subscribe({
      next: (result) => {
        this.alertNotifier.success('Venue was successfully updated')
        this.modalService.dismissAll()
        this.getAllVenues();
      },
      error: (result) => {
        this.alertNotifier.error('Venue was not updated successfully ')
      }
})
 }
}
