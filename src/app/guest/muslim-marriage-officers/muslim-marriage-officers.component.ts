import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-muslim-marriage-officers',
  templateUrl: './muslim-marriage-officers.component.html',
  styleUrls: ['./muslim-marriage-officers.component.scss']
})
export class MuslimMarriageOfficersComponent {
  muslimMarriageOfficers:any
  p = 1
  marriageOfficerForm:FormGroup
  constructor(private auth: AuthService,private modalService: NgbModal,){
    
  }

  ngOnInit() {
    this.initializeForm()
    this.getMuslimMarriageOfficers()
  }

  getMuslimMarriageOfficers() {
    this.auth.get('/user/marriage-officers/muslim').subscribe({
      next: (response) => {
        this.muslimMarriageOfficers = response['officers'];
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
        license_officer: new FormControl('',Validators.required),
        license_number: new FormControl('',Validators.required),
        license_officer_designation: new FormControl('',Validators.required),
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
