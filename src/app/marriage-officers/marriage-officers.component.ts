import { Component, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertComponent } from '../shared/alert/alert.component';

@Component({
  selector: 'app-marriage-officers',
  templateUrl: './marriage-officers.component.html',
  styleUrls: ['./marriage-officers.component.scss']
})
export class MarriageOfficersComponent {
  @ViewChild('#exampleLargeModal') cateogoryModal
  @ViewChild('alert') alertNotifier: AlertComponent

  marriageOfficerForm: FormGroup
  marriageOfficerSeacrh: FormGroup
  p: number = 1
  officers: any;
  category_id: any;
  region: string = "Greater Accra"
  name: string = ""
  church: string = ""
  constructor(private auth: AuthService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal) {

  }
  ngOnInit(): void {
    this.initializeForm()
    this.getAllOfficers()
    this.initializeSearch()

  }

  ngAfterViewInit(): void {
    console.log('cat ', this.cateogoryModal)
    //this.modalService.open()
  }

  open(content) {
    this.marriageOfficerForm.reset()
    this.modalService.open(content, { size: 'lg' });
  }

  searchMarriage() {
    console.log('search')
    console.log(this.region)
    this.auth.get(`/admin/marriage-officers/filter?type=${'christian'}&name=${this.name}&church=${this.church}&region=${this.region}`).subscribe({
      next: (response) => {
        console.log(response)
        if(response) {
          this.officers = response['officers'];
        }
      }
    })
  }

  initializeForm() {
    this.marriageOfficerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      designation: new FormControl('', Validators.required),
      denomination: new FormControl('', Validators.required),
      church: new FormControl('', Validators.required),
      region: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      gazette_number: new FormControl('', Validators.required),
      gazette_date: new FormControl('', Validators.required),
      license_officer: new FormControl('', Validators.required),
      appointment_date: new FormControl('', Validators.required),
    })
  }

  initializeSearch() {
    this.marriageOfficerSeacrh = new FormGroup({
      name: new FormControl('', Validators.required),
      church: new FormControl('', Validators.required),
      region: new FormControl('', Validators.required),
    })
  }

  store() {

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

  getAllOfficers() {
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
    this.category_id = null
    this.marriageOfficerForm.reset()
    this.modalService.dismissAll()
  }

  deleteCat(data: any) {

  }

  view(data: any) {

  }

  edit(data: any, modal) {
    console.log(data)
    this.category_id = data?.id

    this.marriageOfficerForm.patchValue(data)
    this.modalService.open(modal, { size: 'lg' });
  }


  deleteCategory(cateogry: any) {
    console.log(cateogry)
    const deleteId = cateogry?.uuid
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

  search($event) {
    console.log($event)
  }

}
