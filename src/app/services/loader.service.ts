import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
    constructor(private spinner: NgxSpinnerService) {}

    ngOnInit() {
      /** spinner starts on init */
    //   this.spinner.show();
  
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 5000);
    }

    show(){
        this.spinner.show("mySpinner", {
            type: "line-scale-party",
            size: "large",
            bdColor: "rgba(0, 0, 0, 1)",
            color: "white",
            template:
              "<img src='https://media.giphy.com/media/o8igknyuKs6aY/giphy.gif' />",
          });
    }

    hide(){
      this.spinner.hide("mySpinner");
    }
}
