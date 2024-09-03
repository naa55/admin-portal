import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-venues',
  templateUrl: './venues.component.html',
  styleUrls: ['./venues.component.scss']
})
export class VenuesComponent {

  venuesArray:any
  p = 1
  venuesForm:FormGroup

  constructor(private auth: AuthService, private fb: FormBuilder,private modalService: NgbModal){
    this.venuesForm = this.fb.group({
      branch: ['',Validators.required],
      denomination: ['',Validators.required],
      designation: ['',Validators.required],
      license_officer: ['',Validators.required],
      location: ['',Validators.required],
      region: ['',Validators.required],
      gazette_number: ['',Validators.required],
      gazette_date: ['',Validators.required]
    })
  }
 

  ngOnInit(){
    this.getVenues()
  }

  getVenues() {
    this.auth.get('/user/venues/all').subscribe({
      next: (response) => {
        this.venuesArray = response['venues'];
        console.log(response);
      },
      error: (result) => {
        console.log(result);
      },
    });
  }

  open(value,content){
    this.venuesForm.reset()
    this.venuesForm.patchValue(value)
    this.modalService.open(content, { size: 'lg' });
  }

  close(){
    this.modalService.dismissAll()
  }
}
