import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  template: ''
})

export class NgbdModalContent {
  @Input() name: any;

  constructor(public activeModal: NgbActiveModal) { }
}

@Component({
  selector: 'app-contractors',
  templateUrl: './contractors.component.html',
  styleUrls: ['./contractors.component.css']
})
export class ContractorsComponent implements OnInit, OnDestroy {

  p: number = 1;
  faEye = faEye
  messageText: string
  getAllContractors: Subscription
  contractors: any;
  contractorsPhoto: string;
  ghanaFront: any;
  ghanaBack: any;
  roadPhoto: any;
  insuranceBack: any;
  insuranceFront: any;
  isLoading: boolean = false;
  contractId: any;
  dateofBirth: string;
  gender: string;
  licenseExpireDate: string;
  licenseIssueDate: string;
  licensePlate: string;
  licenseNumber: string;
  contractorsPhotoLicense: any;


  constructor(
    private modalService: NgbModal,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.allContractors()
  }


  open(content, photo, id) {
    this.contractorsPhoto = photo
    this.contractId = id
    // console.log(photo)
    this.modalService.open(content, { size: 'lg' });
  }

  openLicense(license, photo, id) {
    this.contractorsPhotoLicense = photo
    this.contractId = id
    this.modalService.open(license, { size: 'lg' });

  }
  roadOpen(road, photo, id) {
    this.contractorsPhoto = photo
    this.contractId = id
    this.roadPhoto = photo
    // console.log(photo)
    this.modalService.open(road, { size: 'lg' });
  }
  openGhanaCard(ghanacard, photo_back, photo_front, id) {
    this.contractId = id
    this.ghanaBack = photo_back;
    // console.log(this.ghanaFront)
    this.ghanaFront = photo_front
    // console.log(this.ghanaFront)
    this.modalService.open(ghanacard, { size: 'lg' });
  }
  openInsurance(insurance, photo_back, id) {
    this.contractId = id

    this.insuranceBack = photo_back;
    this.modalService.open(insurance, { size: 'lg' });
  }


  sendMessage(message) {
    this.modalService.open(message);

  }
  openModal(modal, contractor) {
    this.modalService.open(modal);
    // console.log(contractor)
    this.dateofBirth = contractor?.date_of_birth
    this.gender = contractor?.gender
    this.licenseExpireDate = contractor?.license_expire_date
    this.licenseIssueDate = contractor?.license_issue_date
    this.licenseNumber = contractor?.license_number
    this.licensePlate = contractor?.license_plate



  }

  dimissFirst() {
    this.modalService.dismissAll()
  }


  allContractors() {
    let token = sessionStorage.getItem('token');
    this.getAllContractors = this.auth.get('/admin/all/contractors', token).subscribe({
      next: (response) => {
        console.log(response)
        this.contractors = response['contractors']
        console.log(this.contractors)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }


  getApproval(type: string) {
    let token = sessionStorage.getItem('token');
    this.isLoading = true;
    // console.log(type)

    let payload = {
      contractor_id: this.contractId,
      verification_state: 'approved'
    }

    // console.log(payload)



    this.auth.storeAuth(`/admin/approve/contractor_detail?doc_type=${type}`, payload, token).subscribe({
      next: (response) => {
        // console.log(response)
        if (response['status'] === 'success') {
          this.isLoading = false
          this.modalService.dismissAll()
          Swal.fire('', 'Approved Successfully', 'success')
        }
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      },
      error: (error) => {
        this.isLoading = false
      }
    })
  }


  getApprovalLicense(type: string) {
    let token = sessionStorage.getItem('token');
    this.isLoading = true;
    // console.log(type)

    let payload = {
      contractor_id: this.contractId,
      verification_state: 'approved'
    }

    // console.log(payload)



    this.auth.storeAuth(`/admin/approve/contractor_detail?doc_type=${type}`, payload, token).subscribe({
      next: (response) => {
        // console.log(response)
        if (response['status'] === 'success') {
          // console.log(response)
          this.ngOnInit()

        }
      },
      error: (error) => {
        // console.log(error)
      }
    })
  }

  // alertConfirmation() {
  //   Swal.fire({
  //     title: 'Approve License  Number?',
  //     // text: 'This process is irreversible.',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes',
  //     cancelButtonText: 'No',
  //     confirmButtonColor: '#54B435',
  //     cancelButtonColor: 'Crimson',
  //   }).then((result) => {
  //     if (result.value) {
  //       Swal.fire('Approved!', 'License  Approved successfully.', 'success');
  //       this.getApprovalLicense("license_card")
  //     } else if (result.dismiss === Swal.DismissReason.cancel) {
  //       Swal.fire('Cancelled', 'License not approved.)', 'error');
  //     }
  //   });
  // }


  getAll() {
    let token = sessionStorage.getItem('token');
    this.auth.get('/user/shipments', token).subscribe({
      next: (response) => {
        // console.log(response)
      },
      error: (error) => {
        if (error.error['errors']) {
        } else {
          // this.toast.error({ detail: 'Error', summary: error.error['message'], duration: 5000 })

        }
      }
    });
  }

  ngOnDestroy(): void {
    this.getAllContractors.unsubscribe()
  }
}



