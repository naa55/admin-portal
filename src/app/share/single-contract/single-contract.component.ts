import { Component, Input, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  template: ''
})

export class NgbdModalContent {
  @Input() name: any;

  constructor(public activeModal: NgbActiveModal) { }
}


@Component({
  selector: 'app-single-contract',
  templateUrl: './single-contract.component.html',
  styleUrls: ['./single-contract.component.css']
})
export class SingleContractComponent implements OnInit {
  @Input() photo: any

  constructor(    private modalService: NgbModal,
    ) { }



  ngOnInit() {
    console.log(this.photo)
  }

  dimissFirst() {
    this.modalService.dismissAll()
  }

}
