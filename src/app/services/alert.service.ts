import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
    constructor(private spinner: NgxSpinnerService) {}

    ngOnInit() {
      /** spinner starts on init */
    //   this.spinner.show();
  
    }

   show(){

   }
}
