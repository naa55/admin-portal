import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { SpinnerService } from '../services/loader.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { NotifierService } from 'angular-notifier';
import { AlertComponent } from '../shared/alert/alert.component';

@Component({
  selector: 'app-counsellors',
  templateUrl: './counsellors.component.html',
  styleUrls: ['./counsellors.component.scss']
})
export class CounsellorsComponent {
  @ViewChild('alert') alertNotifier: AlertComponent

  p: number = 1;
  counselllorsForm: FormGroup;
  storeData = false
  editData = false
  counsellors: any;
  base64File: string | ArrayBuffer = '';
  counsellorsId: any;
  isLoading: boolean;
  name: string = ""
  selectedFile: File;
  base64String: string | ArrayBuffer = '';
  counsellor: any;


  
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
    this.getAllCounsellors();
  }

    // Capture the file selected
    onFileSelected(event: Event): void {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        this.selectedFile = input.files[0];
        // console.log(this.selectedFile)
        this.convertToBase64()
      }
    }
  
    convertToBase64(): void {
      if (this.selectedFile) {
        const reader = new FileReader();
        reader.readAsDataURL(this.selectedFile);
        reader.onload = () => {
          this.base64String = reader.result as string;
          // console.log(this.base64String)
        };
        reader.onerror = (error) => {
          console.error('Error: ', error);
        };
      }
    }
  
  
  
    onFileChange(event: any) {
      const reader = new FileReader();
      const file = event.target.files[0];
  
      reader.onloadend = () => {
        this.base64File = reader.result;
        // console.log(this.base64File)
      };
  
      reader.readAsDataURL(file);
    }

  showSuccess(message: string) {
    this.notifier.notify('success', message);
  }
  initialiseForm() {
    this.counselllorsForm = new FormGroup({
      name: new FormControl('', Validators.required),
      // profile_pic: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      bio: new FormControl('', Validators.required),
      qualification: new FormControl('', Validators.required),
      institution: new FormControl('', Validators.required),
      religion: new FormControl('', Validators.required),
      church: new FormControl('', Validators.required),
      marital_status: new FormControl('', Validators.required),
      years_of_experience: new FormControl('', Validators.required),
    });
  }

  getAllCounsellors() {
    this.spinner.show();
    this.auth.get('/admin/marriage-counsellors/all').subscribe({
      next: (response) => {
        // console.log(response)
        this.counsellors = response['counsellors'];
        // console.log(this.counsellors)
        this.spinner.hide();
      },
      error: (error) => {
        this.spinner.hide();
        this.alertNotifier.error('Failed to fetch');
      },
    });
  }
  open(content) {
    this.storeData = true
    this.editData = false

    this.counselllorsForm.reset()
    this.modalService.open(content, { size: 'lg' });
  }

  close() {
    this.counselllorsForm.reset()
    this.modalService.dismissAll();
  }
  store() {
    let payload = this.counselllorsForm.value;
    payload.profile_pic = this.base64String
    // console.log(payload)

    this.auth.store('/admin/marriage-counsellors/store', payload).subscribe({
      next: (result) => {
        this.modalService.dismissAll();
        this.getAllCounsellors()
        this.alertNotifier.success('Saved Successfully');
      },
      error: (result) => {
        this.modalService.dismissAll();
      },
    });
  }

  // onFileChange(event: any) {
  //   const reader = new FileReader();
  //   const file = event.target.files[0];

  //   reader.onloadend = () => {
  //     this.base64File = reader.result;
  //   };

  //   reader.readAsDataURL(file);
  // }

  edit(item: any, context) {
    this.open(context);
    this.counsellor = item
    this.counsellorsId = item?.id
    // console.log(item);

    this.storeData = false
    this.editData = true
    this.counselllorsForm.patchValue(item);
  }

  update() {
    let payload = this.counselllorsForm.value;
    payload.lawyer = this.counsellor?.name
      payload.profile_pic = this.base64File
      // console.log(payload)

    this.auth.store(`/admin/marriage-counsellors/update/${this.counsellorsId}`, payload).subscribe({
      next: (result) => {
        this.isLoading = false;
        this.alertNotifier.success('Updated Successfully');
        this.getAllCounsellors()
        this.modalService.dismissAll();
      },
      error: (result) => {
        this.alertNotifier.error('Failed to update');
        this.isLoading = false;
      },
    });
  }

  delete(id: any) {
    const deleteId = id;

    this.auth.delete(`/admin/lawyers/remove/${deleteId}`).subscribe({
      next: (result) => {
        this.alertNotifier.success('Deleted Successfully');
        this.getAllCounsellors()
      },
      error: (result) => {
        // console.log(result);
        this.alertNotifier.error('Unable to delete');
      },
    });
  }

  searchFamily() {
    // console.log('search')
    this.auth.get(`/admin/marriage-counsellors/filter?name=${this.name}`).subscribe({
      next: (response) => {
        // console.log(response)
        if (response) {
          this.counsellors = response['counsellors'];
        }
      }
    })
  }

}
