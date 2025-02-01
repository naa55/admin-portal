import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { SpinnerService } from '../services/loader.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from '../shared/alert/alert.component';

@Component({
  selector: 'app-gazette',
  templateUrl: './gazette.component.html',
  styleUrls: ['./gazette.component.scss']
})
export class GazetteComponent implements OnInit {

  gazetteForm: FormGroup;
  base64File: any
  isLoading = false
  @ViewChild('alert') alertNotifier: AlertComponent
  p: number = 1;
  gazetteArray: any;
  gazette_id: any;
  updateItem: any;
  gazette_number = ''
  gazette_title = ''
  gazette_date = ''


  constructor(private auth: AuthService, private spinner: SpinnerService, private modalService: NgbModal,
    public activeModal: NgbActiveModal) {
    this.initialiseForm()
  }

  ngOnInit(): void {
    this.getAllGazette();

  }

  initialiseForm() {
    this.gazetteForm = new FormGroup({
      gazette_number: new FormControl('', Validators.required),
      gazette_file: new FormControl('', Validators.required),
      gazette_title: new FormControl('', Validators.required),
      gazette_date: new FormControl('', Validators.required)
    })
  }

  store() {
    this.isLoading = true
    let payload = this.gazetteForm.value

    payload['gazette_file'] = this.base64File



    this.auth.store('/admin/gazette/store', payload).subscribe({
      next: (result) => {
        this.isLoading = false
        this.alertNotifier.success('Gazette Uploaded Successfully');
        this.getAllGazette();

        this.modalService.dismissAll()

      },
      error: (result) => {
        this.isLoading = false
        this.modalService.dismissAll()
        this.alertNotifier.warning('Gazette Uploaded Unsuccessfully');


      }
    })
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    const file = event.target.files[0];

    reader.onloadend = () => {
      this.base64File = reader.result;
    };

    reader.readAsDataURL(file);
  }

  open(content) {
    this.gazetteForm.reset()
    this.modalService.open(content, { size: 'lg' });
  }

  close() {
    this.gazetteForm.reset()
    this.gazette_id = null
    this.modalService.dismissAll()
  }



  getAllGazette() {

    this.auth.get('/admin/gazette/all').subscribe({
      next: (response) => {
        this.gazetteArray = response['gazettes']

        // console.log(response) 
      },
      error: (result) => {
        // console.log(result)
      }
    })
  }

  edit(item: any, context) {
    this.open(context)
    this.gazette_id = item?.id
    this.updateItem = item

    this.gazetteForm.patchValue(item)
    this.gazetteForm.patchValue({

      gazette_date: new Date(item.gazette_date).toISOString().substring(0, 10),
    })

  }

  update() {
    this.isLoading = true
    let payload = this.gazetteForm.value
    if (this.updateItem?.gazette_file) {
      payload['gazette_file'] = ''
    } else {
      payload['gazette_file'] = this.base64File

    }

    this.auth.store(`/admin/gazette/update/${this.gazette_id}`, payload).subscribe({
      next: (result) => {
        this.gazette_id = null
        this.isLoading = false
        this.modalService.dismissAll()
        this.alertNotifier.success('Gazette Updated Successfully');

        this.getAllGazette()
      },
      error: (result) => {
        // console.log(result)
        this.isLoading = false
        this.alertNotifier.success('Gazette Updated Unsuccessfully');

      }
    })
  }

  delete(id: string) {
    const deleteId = id

    this.auth.get(`/admin/gazette/remove/${deleteId}`).subscribe({
      next: (result) => {
        this.alertNotifier.success('Gazette deleted Successfully')
        this.getAllGazette()
      },
      error: (result) => {
        // console.log(result)
        this.alertNotifier.success('Gazette deleted Unsuccessfully')

      }
    })
  }

  searchGazette() {

    const payload = {

      gazette_number: this.gazette_number,
      gazette_title: this.gazette_title,
      gazette_date: this.gazette_date
    }

    this.auth.store(`/admin/gazette/filter`, payload).subscribe({
      next: (response) => {
        if (response) {
          this.gazetteArray = response['gazettes']
        }
      }
    })

  }
}
