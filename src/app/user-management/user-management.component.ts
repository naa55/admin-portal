import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

    p: number = 1;
    users: []
    userFormGroup:FormGroup
    constructor(){

    }
    ngOnInit(): void {
        this.initialiseForm()
    }

    onSubmit($event){

    }

    initialiseForm(){
        this.userFormGroup = new FormGroup({
            first_name: new FormControl(),
            last_name: new FormControl(),
            email: new FormControl(),
            phone_number: new FormControl(),
            password: new FormControl(),
            confirm_password: new FormControl()
        })
    }

    onSignIn(){

    }
}