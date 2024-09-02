import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { SpinnerService } from '../services/loader.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { NotifierService } from 'angular-notifier';
import { AlertComponent } from '../shared/alert/alert.component';

@Component({
  selector: 'app-family-lawyer',
  templateUrl: './family-lawyer.component.html',
  styleUrls: ['./family-lawyer.component.scss'],
})
export class FamilyLawyerComponent {
  @ViewChild('alert') alertNotifier:AlertComponent

  p: number = 1;
  users: [];
  caseLawGroup: FormGroup;
  base64File: any;
  categories: [] = [];
  familyLawyers: any[] = [];
  case_id: any;
  isLoading = false;

  constructor(
    private auth: AuthService,
    private spinner: SpinnerService,
    private modalService: NgbModal,
    private notifier: NotifierService,
   
  ) {
    this.initialiseForm();
  }

  ngOnInit() {
    // this.service.show()
    this.getCategories();
  }

  ngAfterViewInit() {}

  showSuccess(message: string) {
    this.notifier.notify('success', message);
  }

  // showSuccess() {
  //   Swal.fire({
  //     icon: 'success',
  //     title: 'Operation Successful',
  //     text: 'Your operation was completed successfully!'
  //   });
  // }

  initialiseForm() {
    this.caseLawGroup = new FormGroup({
      lawyer: new FormControl('',Validators.required),
      email: new FormControl('',Validators.required),
      phone_number: new FormControl('',Validators.required),
      location: new FormControl('',Validators.required),
      place_of_work: new FormControl('',Validators.required),
      position_held: new FormControl('',Validators.required),
      about: new FormControl('',Validators.required),
      professional_membership: new FormControl('',Validators.required),
      case_track_record: new FormControl('',Validators.required),
      work_experience: new FormControl('',Validators.required),
      date_of_call: new FormControl('',Validators.required),
      profile_picture: new FormControl('',Validators.required),
    });
  }

  store() {
    this.isLoading = true;
    let payload = this.caseLawGroup.value;
    payload['case_file'] = this.base64File;
    payload['case_law'] = 'First human law';

    this.auth.store('/admin/lawyers/store', payload).subscribe({
      next: (result) => {
        this.isLoading = false;
        this.modalService.dismissAll();
        this.alertNotifier.success('Saved Successfully');
      },
      error: (result) => {
        this.isLoading = false;
        this.modalService.dismissAll();
      },
    });
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    const file = event.target.files[0];

    reader.onloadend = () => {
      this.base64File = reader.result;
    };

    reader.readAsDataURL(file);
  }

  getCategories() {
    this.spinner.show();
    this.auth.get('/admin/lawyers/all').subscribe({
      next: (response) => {
        this.familyLawyers = response['lawyers'];
        this.spinner.hide();
      },
      error: (error) => {
        this.spinner.hide();
        this.alertNotifier.error('Failed to fetch');
      },
    });
  }

  edit(category: any, context) {
    this.open(context);
    this.case_id = category?.uuid;
    console.log(category);

    this.caseLawGroup.patchValue(category);
  }

  update() {
    this.isLoading = true;
    let payload = this.caseLawGroup.value;
    payload['case_file'] = this.base64File;
    payload['case_law'] = 'First human law';
    payload['case_id'] = this.case_id;

    this.auth.store('/admin/lawyers/store', payload).subscribe({
      next: (result) => {
        this.case_id = null;
        this.isLoading = false;
        this.alertNotifier.success('Updated Successfully');
        this.modalService.dismissAll();
      },
      error: (result) => {
        this.alertNotifier.error('Failed to update');
        this.isLoading = false;
      },
    });
  }

  delete(id: string) {
    const deleteId = id;

    this.auth.delete(`/admin/case-law/remove/${deleteId}`).subscribe({
      next: (result) => {
        this.case_id = null;
        this.alertNotifier.success('Deleted Successfully');
      },
      error: (result) => {
        console.log(result);
        this.alertNotifier.error('Unable to delete');
      },
    });
  }

  addCase() {
    this.caseLawGroup.reset();
    this.case_id = null;
  }

  open(content) {
    this.alertNotifier.success('We have an alert now');
    this.caseLawGroup.reset()
    this.modalService.open(content, { size: 'lg' });
  }

  close() {
    this.case_id = null
    this.caseLawGroup.reset()
    this.modalService.dismissAll();
  }

 
}
