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
  @ViewChild('alert') alertNotifier: AlertComponent

  p: number = 1;
  familyLawyersForm: FormGroup;
  base64File: any;
  categories: [] = [];
  familyLawyers: any[] = [];
  case_id: any;
  isLoading = false;
  name: string = ""
  familyId: any;
  storeData = false
  editData = false
  selectedFile: File | null = null;
  base64String: string | ArrayBuffer = '';
  responsePicture: any;


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
    this.getAllFamilyLawyers();
  }

  ngAfterViewInit() { }

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
    this.familyLawyersForm = new FormGroup({
      lawyer: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone_number: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      place_of_work: new FormControl('', Validators.required),
      position_held: new FormControl('', Validators.required),
      about: new FormControl('', Validators.required),
      professional_membership: new FormControl('', Validators.required),
      case_track_record: new FormControl('', Validators.required),
      work_experience: new FormControl('', Validators.required),
      date_of_call: new FormControl('', Validators.required),
      // profile_picture: new FormControl('', Validators.required),
    });
  }

  store() {
    this.isLoading = true;
    let payload = this.familyLawyersForm.value;
    payload.profile_picture = this.base64String

    // console.log(payload)


    this.auth.store('/admin/lawyers/store', payload).subscribe({
      next: (result) => {
        this.isLoading = false;
        this.modalService.dismissAll();
        this.alertNotifier.success('Saved Successfully');
        this.getAllFamilyLawyers()
      },
      error: (result) => {
        this.isLoading = false;
        this.modalService.dismissAll();
      },
    });
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

  getAllFamilyLawyers() {
    this.spinner.show();
    this.auth.get('/admin/lawyers/all').subscribe({
      next: (response) => {
        this.familyLawyers = response['lawyers'];
        // console.log(this.familyLawyers)
        this.spinner.hide();
      },
      error: (error) => {
        this.spinner.hide();
        this.alertNotifier.error('Failed to fetch');
      },
    });
  }

  edit(item: any, context) {
    this.open(context);
    this.familyId = item?.id
    // console.log(item?.date_of_call);
    this.storeData = false
    this.editData = true

    this.familyLawyersForm.patchValue(item);



    this.familyLawyersForm.get("professional_membership").patchValue(item?.professional_memberships);
    this.familyLawyersForm.get("lawyer").patchValue(item?.lawyer_name);
    this.familyLawyersForm.get("email").patchValue(item?.contact_details?.email);
    this.familyLawyersForm.get("phone_number").patchValue(item?.contact_details?.phone);
    // this.familyLawyersForm.get("date_of_call").patchValue(new Date(item?.date_of_call).toISOString().substring(0, 10));
    console.log('data' + new Date(item?.date_of_call).toISOString().substring(0, 10))
      this.familyLawyersForm.patchValue({
        date_of_call: new Date(item?.date_of_call).toISOString().substring(0, 10),
      });
  }

  update() {
    this.isLoading = true;
    let payload = this.familyLawyersForm.value;
    // console.log(payload)
      payload.profile_picture = this.base64String
    
    // console.log(payload)
    this.auth.store(`/admin/lawyers/update/${this.familyId}`, payload).subscribe({
      next: (result) => {
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
  

  delete(id: any) {
    const deleteId = id;

    this.auth.get(`/admin/lawyers/remove/${deleteId}`).subscribe({
      next: (result) => {
        this.alertNotifier.success('Deleted Successfully');
        this.getAllFamilyLawyers()
      },
      error: (result) => {
        // console.log(result);
        this.getAllFamilyLawyers()
        this.alertNotifier.error('Unable to delete');
      },
    });
  }

  addCase() {
    this.familyLawyersForm.reset();
  }

  open(content) {
    this.storeData = true
    this.editData = false

    this.familyLawyersForm.reset()
    this.modalService.open(content, { size: 'lg' });
  }

  close() {
    this.case_id = null
    this.familyLawyersForm.reset()
    this.modalService.dismissAll();
  }

  searchFamily() {
    // console.log('search')
    this.auth.get(`/admin/lawyers/filter?name=${this.name}`).subscribe({
      next: (response) => {
        // console.log(response['data'])
        if (response) {
          this.familyLawyers = response['data'];
        }
      }
    })
  }
}
