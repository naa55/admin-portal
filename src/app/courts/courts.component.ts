import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from '../shared/alert/alert.component';

@Component({
  selector: 'app-courts',
  templateUrl: './courts.component.html',
  styleUrls: ['./courts.component.scss']
})
export class CourtsComponent {
  @ViewChild('#exampleLargeModal') cateogoryModal
  @ViewChild('alert') alertNotifier: AlertComponent

  courtForm: FormGroup
  p: number = 1
  courtArray: any;
  category_id: any;
  courtId: any;
  categoryArray: any;
  categoryItem: any
  storeData = false
  editData = false

  constructor(private auth: AuthService,
    private modalService: NgbModal,) {

  }
  ngOnInit(): void {
    this.initializeForm()
    this.getAllCourt()
    this.getAllCategories()

  }

  ngAfterViewInit(): void {

  }

  open(content) {
    this.storeData = true
    this.editData = false

    this.courtForm.reset()
    this.modalService.open(content, { size: 'lg' });
  }

  initializeForm() {
    this.courtForm = new FormGroup({
      court: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required)

    })
  }



  store() {

    const payload = this.courtForm.value
    // console.log(payload)

    this.auth.store('/admin/courts/store', payload).subscribe({
      next: (result) => {
        this.modalService.dismissAll()
        this.getAllCourt();
        this.alertNotifier.success('Court created successfully')
      },
      error: (result) => {
        this.alertNotifier.error('Error creating court')
      }
    })
  }

  getAllCourt() {
    this.auth.get('/admin/courts/all').subscribe({
      next: (response) => {
        this.courtArray = response['courts']
        // console.log(response)
      },
      error: (result) => {
        // console.log(result)
      }
    })
  }
  getAllCategories() {

    this.auth.get('/admin/categories').subscribe({
      next: (response) => {
        this.categoryArray = response['categories']
        // console.log(response)
      },
      error: (result) => {
        // console.log(result)
      }
    })
  }

  getCategoryFromItem(e) {
    // console.log(e)
  }

  deleteCat(data: any) {

  }

  view(data: any) {

  }

  edit(data: any, modal) {
    // console.log(data)

    this.courtId = data?.uuid
    this.open(modal)
    // console.log(this.courtId)
    // console.log(data);
    this.storeData = false
    this.editData = true
    this.courtForm.patchValue(data)

  }



  update() {
    let payload = this.courtForm.value;
    // console.log(payload);
    // console.log(payload)
    // console.log(this.courtId);

    this.auth.update(`/admin/courts/update/${this.courtId}`, payload)
      .subscribe({
        next: (result) => {
          // console.log(result)
          if (result['status'] === "success") {
            this.alertNotifier.success('Updated Successfully');
            this.modalService.dismissAll()
            this.getAllCourt()
          }
        },
        error: (error) => {
          // console.log(error)
        }
      })

  }



  deleteCourt(item: any) {
    // console.log(item)

    const deleteId = item?.uuid
    this.auth.get(`/admin/courts/remove/${deleteId}`).subscribe({
      next: (result) => {
        this.getAllCourt()
        this.modalService.dismissAll()
        this.alertNotifier.success('Court deleted successfully')
      },
      error: (result) => {
        this.alertNotifier.error('Court deleted unsuccessfully')
        // this.getAllCourt()
      }
    })
  }

  close() {
    this.modalService.dismissAll()
  }

  search($event) {
    // console.log($event)
  }
}
