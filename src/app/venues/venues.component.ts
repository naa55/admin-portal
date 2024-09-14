import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-venues',
  templateUrl: './venues.component.html',
  styleUrls: ['./venues.component.scss']
})
export class VenuesComponent {

  venueForm:FormGroup
  p:number = 1
  venuesArray:any;
  category_id: any;
  place: string = "";
  region: string = "";
  church: string = "Greater Accra"

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

deleteCat(data:any){

}

view(data:any){

}

edit(data:any,modal){

this.category_id = data?.id

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
