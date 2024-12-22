import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { SpinnerService } from '../services/loader.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from '../shared/alert/alert.component';

@Component({
  selector: 'app-gazette-request',
  templateUrl: './gazette-request.component.html',
  styleUrls: ['./gazette-request.component.scss']
})
export class GazetteRequestComponent {
  @ViewChild('alert') alertNotifier: AlertComponent

  p: number = 1;
  gazetteArray: any;


  constructor(private auth: AuthService, private spinner: SpinnerService, private modalService: NgbModal,
    public activeModal: NgbActiveModal) {
    this.initialiseForm()
  }

  ngOnInit(): void {
    this.getAllRequetedGazette();

  }

  initialiseForm() {
    
  }

  store() {
   


    // this.auth.store('/admin/gazette/store', payload).subscribe({
    //   next: (result) => {
    //     this.alertNotifier.success('Gazette Uploaded Successfully');
    //     this.getAllRequetedGazette();

    //     this.modalService.dismissAll()

    //   },
    //   error: (result) => {
    //     this.isLoading = false
    //     this.modalService.dismissAll()
    //     this.alertNotifier.warning('Gazette Uploaded Unsuccessfully');


    //   }
    // })
  }



  

  getAllRequetedGazette() {

    this.auth.get('/admin/gazette/requests').subscribe({
      next: (response) => {
        console.log(response)
        this.gazetteArray = response['gazette_requests']
        console.log(this.gazetteArray)

        // console.log(response) 
      },
      error: (result) => {
        // console.log(result)
      }
    })
  }

  fullfillRequest(item) {

   const payload =  {
      gazette_number: item?.gazette_number,
      id: item?.id

    }
    
    console.log(payload)
    
    this.auth.store('/admin/gazette/fulfill', payload).subscribe({
      next: (result) => {
        console.log(result)
        // this.alertNotifier.success('Gazette Uploaded Successfully');
        this.getAllRequetedGazette();

        // this.modalService.dismissAll()

      },
      error: (result) => {
        this.alertNotifier.warning('Gazette Uploaded Unsuccessfully');


      }
    })
  }



  // searchGazette() {

  //   const payload = {

  //     gazette_number: this.gazette_number,
  //     gazette_title: this.gazette_title,
  //     gazette_date: this.gazette_date
  //   }

  //   console.log(payload)

  //   this.auth.store(`/admin/gazette/filter`, payload).subscribe({
  //     next: (response) => {
  //       console.log(response)
  //       if (response) {
  //         this.gazetteArray = response['gazettes']
  //       }
  //     }
  //   })

  // }
}
