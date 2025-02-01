import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { SpinnerService } from '../services/loader.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from '../shared/alert/alert.component';

@Component({
  selector: 'app-statutes',
  templateUrl: './statutes.component.html',
  styleUrls: ['./statutes.component.scss']
})
export class StatutesComponent implements OnInit {

  statutesForm: FormGroup;
  p: number = 1;
  base64File: any
  isLoading = false
  @ViewChild('alert') alertNotifier: AlertComponent
  statutes_id: null;
  statutesArray: any;
  updateItem: any;
  statute_title = '';
  year_of_act = ''



  constructor(private auth: AuthService, private spinner: SpinnerService, private modalService: NgbModal,
    public activeModal: NgbActiveModal) {
    this.initialiseForm()
  }

  initialiseForm() {
    this.statutesForm = new FormGroup({
      statute_title: new FormControl('', Validators.required),
      statute_file: new FormControl('', Validators.required),
      year_of_act: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    this.getAllStatutes()
  }


  store() {
    this.isLoading = true
    let payload = this.statutesForm.value

    payload['statute_file'] = this.base64File



    this.auth.store('/admin/statutes/store', payload).subscribe({
      next: (result) => {
        this.isLoading = false
        this.alertNotifier.success('Statutes Uploaded Successfully');
        this.getAllStatutes();

        this.modalService.dismissAll()

      },
      error: (result) => {
        this.isLoading = false
        this.modalService.dismissAll()
        this.alertNotifier.warning('Statutes Uploaded Unsuccessfully');


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
    this.statutesForm.reset()
    this.modalService.open(content, { size: 'lg' });
  }

  close() {
    this.statutesForm.reset()
    this.statutes_id = null
    this.modalService.dismissAll()
  }



  getAllStatutes() {
        
    this.auth.get('/admin/statutes/all').subscribe({
      next: (response) => {
        this.statutesArray = response['statutes']

        // console.log(response) 
      },
      error: (result) => {
        // console.log(result)
      }
    })
  }

  edit(item: any, context) {
    this.open(context)
    this.statutes_id = item?.id
    this.updateItem = item

    this.statutesForm.patchValue(item)
    this.statutesForm.patchValue({
      statute_title: item.title,
      year_of_act: new Date(item.year_of_act).toISOString().substring(0, 10),
    })

  }

  update() {
    this.isLoading = true
    let payload = this.statutesForm.value
    if (this.updateItem?.statute_file) {
      payload['statute_file'] = ''
    } else {
      payload['statute_file'] = this.base64File

    }

    this.auth.store(`/admin/statutes/update/${this.statutes_id}`, payload).subscribe({
      next: (result) => {
        this.statutes_id = null
        this.isLoading = false
        this.modalService.dismissAll()
        this.alertNotifier.success('Statutes Updated Successfully');

        this.getAllStatutes()
      },
      error: (result) => {
        // console.log(result)
        this.isLoading = false
        this.alertNotifier.success('Statutes Updated Unsuccessfully');

      }
    })
  }

  delete(id: string) {
    const deleteId = id

    this.auth.get(`/admin/statutes/remove/${deleteId}`).subscribe({
      next: (result) => {
        this.alertNotifier.success('Statutes deleted Successfully')
        this.getAllStatutes()
      },
      error: (result) => {
        // console.log(result)
        this.alertNotifier.success('Statutes deleted Unsuccessfully')

      }
    })
  }

  searchStatutes() {

    const payload = {

      year_of_act: this.year_of_act,
      statute_title: this.statute_title,
    }


    this.auth.store(`/admin/statutes/filter`, payload).subscribe({
      next: (response) => {
        if (response) {
          this.statutesArray = response['statutes']
        }
      }
    })

  }
}
