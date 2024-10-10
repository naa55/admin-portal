import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-marriage-officers',
  templateUrl: './marriage-officers.component.html',
  styleUrls: ['./marriage-officers.component.scss']
})
export class GuestMarriageOfficersComponent {
  marriageOfficers:any
  marriageOfficerForm:FormGroup
  p = 1
  constructor(private auth: AuthService, private modalService: NgbModal,){
    
  }

  ngOnInit() {
    this.initializeForm()
     this.getMarriageOfficers()
  }

  getMarriageOfficers() {
    
    this.auth.get('/user/marriage-officers').subscribe({
      next: (response) => {
        this.marriageOfficers = response['officers'];
        
        // console.log(response);
      },
      error: (result) => {
        // console.log(result);
      },
    });
  }

  initializeForm(){
    this.marriageOfficerForm = new FormGroup({
        officer_name: new FormControl('',Validators.required),
        gender: new FormControl('',Validators.required),
        designation: new FormControl('',Validators.required),
        denomination: new FormControl('',Validators.required),
        church: new FormControl('',Validators.required),
        region: new FormControl('',Validators.required),
        location: new FormControl('',Validators.required),
        gazette_number: new FormControl('',Validators.required),
        gazette_date: new FormControl('',Validators.required),
        license_officer: new FormControl('',Validators.required),
        
        appointment_date: new FormControl('',Validators.required),
    })
}

open(data,content){
  this.marriageOfficerForm.reset()
  this.marriageOfficerForm.patchValue(data)
  this.modalService.open(content, { size: 'lg' });
}

close(){
  this.modalService.dismissAll()
}
}
