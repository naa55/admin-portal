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
  storeData = false
  editData = false
  christianId: any;
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
        if (response) {
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

  getDateConversion(item) {
    const dateStr = item;
    const date = new Date(dateStr);

    // Extract day, month, and year
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() is 0-indexed
    const year = String(date.getFullYear()).slice(-2);

    // Format to dd/mm/yy
    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate

  }

  edit(data: any, modal) {
    console.log(data)
    this.storeData = false
    this.editData = true
    this.open(modal);
    this.christianId = data?.id
    this.auth.get(`/admin/marriage-officers/show?officer_id=${data?.id}&type=${'christian'}`).subscribe({
      next: (response) => {
        if (response['officer']) {
          this.storeData = false
          this.editData = true
          this.marriageOfficerForm.get("name").patchValue(data?.officer_name);
          this.marriageOfficerForm.get("gender").patchValue(data?.gender);
          this.marriageOfficerForm.get("gazette_date").patchValue(data?.gazette_date);
          this.marriageOfficerForm.get("gazette_number").patchValue(data?.gazette_number);
          this.marriageOfficerForm.get("location").patchValue(data?.location);
          this.marriageOfficerForm.get("region").patchValue(data?.region);
          this.marriageOfficerForm.get("church").patchValue(data?.church);
          this.marriageOfficerForm.get("denomination").patchValue(data?.denomination);
          this.marriageOfficerForm.get("license_officer").patchValue(data?.license_officer);
          this.marriageOfficerForm.get("designation").patchValue(data?.license_officer_designation);
          this.marriageOfficerForm.get("appointment_date").patchValue(data?.appointment_date);
        }
      }
    })


    // console.log(data)
    // this.category_id = data?.id

    // this.marriageOfficerForm.patchValue(data)
    // this.modalService.open(modal, { size: 'lg' });
  }

  update() {
    let payload = this.marriageOfficerForm.value;
    console.log(payload);
    console.log(this.christianId)
    
    this.auth.update(`/admin/marriage-officers/christian/update/${this.christianId}`, payload)
      .subscribe({
        next: (result) => {
          console.log(result)
          if (result['status'] === "success") {
            this.alertNotifier.success('Updated Successfully');
            this.modalService.dismissAll()
            this.getAllOfficers()
          }
        },
        error: (error) => {
          console.log(error)
        }
      })

  }


  deleteOfficer(item) {
    console.log(item)
    this.auth.destroyUrl(`/admin/marriage-officers/remove?type=${1}&officer_id=${item?.id}`).subscribe({
      next: (response) => {
        if (response['status'] === "success") {
          this.alertNotifier.success('Deleted Successfully');
          this.modalService.dismissAll()
          this.getAllOfficers()
        }
      }
    })
  }

}
