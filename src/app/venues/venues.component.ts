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
  page = 1;
  venueForm:FormGroup
  p:number = 1
  itemsPerPage: number = 20; // Default items per page
  perPageOptions: number[] = [];
  venuesArray:any;
  category_id: any;
  place: string = "";
  region: string = "";
  church: string = ""
  storeData = false
  editData = false
  venueId: any;
  totalItems: any;


  constructor(private auth: AuthService,
    private modalService: NgbModal){

  }
  ngOnInit(): void {
     this.initializeForm()
     this.getAllVenues()
     
  }

  generatePerPageOptions() {
    const maxOption = Math.ceil(this.venuesArray?.length / 20) * 20; // Maximum option based on total items
    this.perPageOptions = [];
    for (let i = 20; i <= maxOption; i += 20) {
      this.perPageOptions.push(i);
    }
  }

  open(content){
    this.storeData = true
    this.editData = false
    this.venueForm.reset()
    this.modalService.open(content, { size: 'lg' });
  }

  getStartIndex(): number {
    return (this.p - 1) * this.itemsPerPage;
  }

  // Calculate the end index of the current page
  getEndIndex(): number {
    const endIndex = this.p * this.itemsPerPage;
    return endIndex > this.venuesArray?.length ? this.venuesArray?.length : endIndex;
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
        local_assembly: new FormControl(),

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
            // console.log(result)
          }
  })
}

getAllVenues(){
  this.auth.get('/admin/venues/all').subscribe({
      next: (response) => {
          this.venuesArray = response['venues']
          this.generatePerPageOptions()

          this.totalItems = this.venuesArray?.length;

        // console.log(response) 
      },
      error: (result) => {
        // console.log(result)
      }
})
}



close() {
  // console.log('close')
this.modalService.dismissAll() 
this.storeData = false
this.editData = false
}


edit(data:any,modal){
  this.storeData = false
  this.editData = true

this.venueId = data.id

this.venueForm.patchValue(data)
this.venueForm.patchValue({
  gazette_date: new Date(data.gazette_date).toISOString().substring(0, 10),
  license_date: new Date(data?.license_date).toISOString().substring(0, 10)
});
this.modalService.open(modal, { size: 'lg' });

}


deleteCategory(cateogry:any){
// console.log(cateogry)
const deleteId  = cateogry?.uuid
    this.auth.delete(`/admin/remove-category/${deleteId}`).subscribe({
     next: (result) => {
       this.category_id = null
       this.modalService.dismissAll()
       this.getAllVenues()
      //  console.log(result) 
     },
     error: (result) => {
      //  console.log(result)
     }
 })
}

search($event){
  // console.log($event)
 }

 

 update() {
  let payload = this.venueForm.value;
  // console.log(payload);
  // console.log(this.venueId);

  this.auth.update(`/admin/venues/update/${this.venueId}`, payload)
    .subscribe({
      next: (result) => {
        // console.log(result)
        if (result['status'] === "success") {
          // this.alertNotifier.success('Updated Successfully');
          this.modalService.dismissAll()
          this.getAllVenues()
        }
      },
      error: (error) => {
        // console.log(error)
      }
    })

}


deleteFromList(item) {
  // console.log(item)
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
  // console.log('search')
  // console.log(this.region)
  this.auth.get(`/admin/venues/filter?place=${this.place}&denomination=${this.church}&region=${this.region}`).subscribe({
    next: (response) => {
      // console.log(response)
      if(response) {
        this.venuesArray = response['venues'];
      }
    }
  })
}



}
