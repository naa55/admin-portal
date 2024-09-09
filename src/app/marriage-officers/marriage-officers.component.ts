import { Component, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertComponent } from '../shared/alert/alert.component';
import * as moment from 'moment';

@Component({
  selector: 'app-marriage-officers',
  templateUrl: './marriage-officers.component.html',
  styleUrls: ['./marriage-officers.component.scss']
})
export class MarriageOfficersComponent {
  @ViewChild('#exampleLargeModal') cateogoryModal
  @ViewChild('alert') alertNotifier:AlertComponent

  marriageOfficerForm:FormGroup
    p:number = 1
    officers:any;
    category_id: any;
    model: NgbDateStruct;
    gazette_date:NgbDateStruct
    appointment_date: NgbDateStruct

    constructor(private auth: AuthService,
      private modalService: NgbModal,
      public activeModal: NgbActiveModal){

    }
    ngOnInit(): void {
       this.initializeForm()
       this.getAllOfficers()
       
    }

    open(content){
      this.marriageOfficerForm.reset()
      this.modalService.open(content, { size: 'lg' });
    }

    initializeForm(){
        this.marriageOfficerForm = new FormGroup({
            name: new FormControl('',Validators.required),
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

    store(){
      
        const payload = this.marriageOfficerForm.value

        this.auth.store('/admin/marriage-officers/christian/store', payload).subscribe({
            next: (result) => {
              this.modalService.dismissAll()
              this.getAllOfficers();
              this.alertNotifier.success('Marriage Officer created successfully')
            },
            error: (result) => {
              this.alertNotifier.success('Marriage Officer creation unsuccessful')
            }
    })
}

getAllOfficers(){
    this.auth.get('/admin/marriage-officers/all').subscribe({
        next: (response) => {
          console.log(response) 
          this.officers = response['officers']
        },
        error: (result) => {
          console.log(result)
        }
})
}

save() {

  this.activeModal.close('Save'); 
}

close() {
  this.category_id = null
  this.marriageOfficerForm.reset()
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
this.marriageOfficerForm.controls['name'].setValue(data?.officer_name)
this.marriageOfficerForm.controls['designation'].setValue(data?.license_officer_designation)
this.gazette_date = this.formatDateToStruct( moment(data?.gazette_date,'YYYY-MMM-DD').format('YYYY-MM-DD'))
this.appointment_date = this.formatDateToStruct( moment(data?.appointment_date,'YYYY-MMM-DD').format('YYYY-MM-DD'))


this.modalService.open(modal, { size: 'lg' });
}


deleteCategory(cateogry:any){
  console.log(cateogry)
  const deleteId  = cateogry?.uuid
      this.auth.delete(`/admin/remove-category/${deleteId}`).subscribe({
       next: (result) => {
         this.category_id = null
         this.modalService.dismissAll()
         this.getAllOfficers()
        this.alertNotifier.success('Marriage Officer deleted successfully')
       },
       error: (result) => {
        this.alertNotifier.error('Deletion unsuccessful')
       }
   })
 }

 search($event){
  console.log($event)
 }

 update(){
      
  const payload = this.marriageOfficerForm.value
  payload['gazette_date']= this.reverseDateStruct(payload['gazette_date'])
  payload['appointment_date']= this.reverseDateStruct(payload['appointment_date'])
//console.log('p ', payload);

  this.auth.update(`/admin/marriage-officers/christian/update/${this.category_id}`, payload).subscribe({
      next: (result) => {
        this.modalService.dismissAll()
        this.getAllOfficers();
        this.alertNotifier.success('Marriage Officer created successfully')
      },
      error: (result) => {
        this.alertNotifier.success('Marriage Officer creation unsuccessful')
      }
})
}

formatDateToStruct(date: string){
  let dateArray = date.split('-')
  let model:NgbDateStruct = {
    year: Number(dateArray[0]),
  month: Number(dateArray[1]),
  day: Number(dateArray[2])
  }

  return model;
}


reverseDateStruct(date: NgbDateStruct){
  return moment(`${date?.year}-${date?.month}-${date?.day}`,'YYYY-MM-DD').format('YYYY-MM-DD')
  console.log(`${date?.year}-${date?.month}-${date?.day}`)
 return `${date?.year}-${date?.month}-${date?.day}`
}
}
