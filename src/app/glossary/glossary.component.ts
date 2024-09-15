import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertComponent } from '../shared/alert/alert.component';
import { AuthService } from '../services/auth.service';
import { SpinnerService } from '../services/loader.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-glossary',
  templateUrl: './glossary.component.html',
  styleUrls: ['./glossary.component.scss']
})
export class GlossaryComponent {
  @ViewChild('alert') alertNotifier: AlertComponent
  p: number = 1;

  glossaryForm: FormGroup;
  isLoading: boolean;
  storeData = false
  editData = false
  gloId: any;
  word: string = ""

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
    this.getGlossaryList()
  }

  initialiseForm() {
    this.glossaryForm = new FormGroup({
      word: new FormControl('', Validators.required),
      meaning: new FormControl('', Validators.required),
      source: new FormControl('', Validators.required),
      related_terms: new FormControl('', Validators.required),
    })
  }

  getGlossaryList() {
    this.auth.get('/admin/glossary/all').subscribe({
      next: (response) => {
        console.log(response)
        this.getGlossaryList = response['words'];


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
    this.glossaryForm.reset()
    this.modalService.open(content, { size: 'lg' });
  }
  edit(data: any, context) {

    this.gloId = data.id;
    console.log(this.gloId)
    this.open(context);
    this.storeData = false
    this.editData = true
    this.glossaryForm.patchValue(data)


    // this.auth.get(`/admin/glossary/show/id=${data.id}`).subscribe({
    //   next: (response) => {
    //     if (response['words']) {
    //       let data = response['words'];
    //       this.storeData = false
    //       this.editData = true
    //       this.glossaryForm.get("word").patchValue(data?.word);
    //       this.glossaryForm.get("meaning").patchValue(data?.meaning);
    //       this.glossaryForm.get("source").patchValue(data?.source);
    //       this.glossaryForm.get("related_terms").patchValue(data?.related_terms);
    //     }
    //   }
    // })

    // this.ImamLength.patchValue(this.);
  }


  close() {
    this.glossaryForm.reset()
    this.modalService.dismissAll();
  }


  search($event) {
    console.log($event)
  }

  store() {
    this.isLoading = true;
    let payload = this.glossaryForm.value;
    console.log(payload)

    this.auth.store('/admin/glossary/store', payload).subscribe({
      next: (result) => {
        if (result['status'] === 'success') {
          this.isLoading = false;
          this.alertNotifier.success('Added Successfully');
          this.modalService.dismissAll();
          this.getGlossaryList()

        }
      },
      error: (result) => {
        this.alertNotifier.error('Failed to Add');
        this.isLoading = false;
      },
    });


  }


  update() {
    let payload = this.glossaryForm.value;
    console.log(payload);
    console.log(this.gloId);

    // this.auth.update(`/admin/glossary/update/${this.gloId}`, payload)
    //   .subscribe({
    //     next: (result) => {
    //       console.log(result)
    //       if (result['status'] === "success") {
    //         this.alertNotifier.success('Updated Successfully');
    //         this.modalService.dismissAll()
    //         this.getGlossaryList()
    //       }
    //     },
    //     error: (error) => {
    //       console.log(error)
    //     }
    //   })

  }

  deleteFromList(item) {
    console.log(item)
    this.auth.destroyUrl(`/admin/glossary/remove/id=${item?.id}`).subscribe({
      next: (response) => {
        if (response['status'] === "success") {
          this.alertNotifier.success('Deleted Successfully');
          this.modalService.dismissAll()
          this.getGlossaryList()
        }
      }
    })

  }

  searchWord() {
    console.log('search')
    this.auth.get(`/admin/glossary/filter?word=${this.word}`).subscribe({
      next: (response) => {
        console.log(response)
        if (response) {
          this.getGlossaryList = response['words'];
        }
      }
    })
  }

}
