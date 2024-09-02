import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  @ViewChild('closeButton') closeButton!: ElementRef;
  alertType : 'success' | 'warning' | 'danger'
  visible : boolean = false
  alertText : string 
  constructor( private renderer: Renderer2){}

  show() {
    setTimeout(() => {
      this.closeAlert();
    }, 3000);
  }

  closeAlert() {
    this.renderer.selectRootElement(this.closeButton.nativeElement).click();
  }

  success(text){
    this.alertText = text
    this.visible = true;
    this.alertType = 'success';
    this.show()
  }

  error(text){
    this.visible = true;
    this.alertText = text
    this.alertType = 'danger';
    this.show()
  }

  warning(text){
    this.visible = true;
    this.alertText = text
    this.alertType = 'warning';
    this.show()
  }
}
