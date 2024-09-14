import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertComponent } from '../shared/alert/alert.component';
import { AuthService } from '../services/auth.service';
import { SpinnerService } from '../services/loader.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-imams',
  templateUrl: './imams.component.html',
  styleUrls: ['./imams.component.scss']
})
export class ImamsComponent implements OnInit {
  @ViewChild('alert') alertNotifier: AlertComponent
  p: number = 1;

  Imamform: FormGroup;
  isLoading: boolean;
  ImamList: any;
  ImamLength: any;
  storeData = false
  editData = false
  updateId: any;
  ImamsId: any;
  district: string = ""
  name: string = ""

  constructor(
    private auth: AuthService,
    private spinner: SpinnerService,
    private modalService: NgbModal,
    private notifier: NotifierService,
  ) {
    this.initialiseForm();
  }

  ngAfterViewInit() { }


  ngOnInit(): void {
    this.getImamList()
  }


  initialiseForm() {
    this.Imamform = new FormGroup({
      name: new FormControl('', Validators.required),
      license_number: new FormControl('', Validators.required),
      town: new FormControl('', Validators.required),
      district: new FormControl('', Validators.required),
      license_officer: new FormControl('', Validators.required),
      designation: new FormControl('', Validators.required),
      license_date: new FormControl('', Validators.required),
    })
  }

  store() {
    this.isLoading = true;
    let payload = this.Imamform.value;
    console.log(payload)

    this.auth.store('/admin/marriage-officers/muslim/store', payload).subscribe({
      next: (result) => {
        if (result['status'] === 'success') {
          this.isLoading = false;
          this.alertNotifier.success('Added Successfully');
          this.getImamList()
          this.modalService.dismissAll();
        }
      },
      error: (result) => {
        this.alertNotifier.error('Failed to Add');
        this.isLoading = false;
      },
    });


  }


  getImamList() {
    const category = "muslim";
    this.auth.get(`/admin/marriage-officers/all?type=${category}`).subscribe({
      next: (response) => {
        console.log(response)
        this.ImamList = response['officers'];
        this.ImamLength = response['officers'].length;
        console.log(this.ImamLength)
      },
      error: (result) => {
        console.log(result)
      }
    })
  }
  open(content) {
    console.log(content)
    this.storeData = true
    this.editData = false
    // this.alertNotifier.success('We have an alert now');
    this.Imamform.reset()
    this.modalService.open(content, { size: 'lg' });
  }
  edit(id: any, context) {
    this.updateId = id
    console.log(context)
    this.open(context);
    // // this.case_id = category?.uuid;
    // console.log(category);
    const type = 'muslim';
    console.log(id)
    this.ImamsId = id

    this.auth.get(`/admin/marriage-officers/show?officer_id=${id}&type=${type}`).subscribe({
      next: (response) => {
        if (response['officer']) {
          let data = response['officer'];
          this.storeData = false
          this.editData = true
          this.Imamform.get("name").patchValue(data?.officer_name);
          this.Imamform.get("license_number").patchValue(data?.license_number);
          this.Imamform.get("town").patchValue(data?.town);
          this.Imamform.get("license_officer").patchValue(data?.license_officer);
          this.Imamform.get("designation").patchValue(data?.license_officer_designation);
          this.Imamform.get("license_date").patchValue(data?.license_date);
          this.Imamform.get("district").patchValue(data?.district);
        }
      }
    })

    // this.ImamLength.patchValue(this.);
  }


  close() {
    this.Imamform.reset()
    this.modalService.dismissAll();
  }


  search($event) {
    console.log($event)
  }


  update() {
    let payload = this.Imamform.value;
    console.log(payload);
    console.log(this.ImamsId);

    this.auth.update(`/admin/marriage-officers/muslim/update/${this.ImamsId}`, payload)
      .subscribe({
        next: (result) => {
          console.log(result)
          if (result['status'] === "success") {
            this.alertNotifier.success('Updated Successfully');
            this.modalService.dismissAll()
            this.getImamList()
          }
        },
        error: (error) => {
          console.log(error)
        }
      })

  }

  deleteFromList(item) {
    console.log(item)
    this.auth.destroyUrl(`/admin/marriage-officers/remove?type=${2}&officer_id=${item?.id}`).subscribe({
      next: (response) => {
        if (response['status'] === "success") {
          this.alertNotifier.success('Deleted Successfully');
          this.modalService.dismissAll()
          this.getImamList()
        }
      }
    })

  }

  
  searchMarriage() {
    console.log('search')
    this.auth.get(`/admin/marriage-officers/filter?type=${'muslim'}&priest=${this.name}&district=${this.district}`).subscribe({
      next: (response) => {
        console.log(response)
        if(response) {
          this.ImamList = response['officers'];
        }
      }
    })
  }

}
