import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareRoutingModule } from './share-routing.module';
import { SingleContractComponent } from './single-contract/single-contract.component';
import { DoubleContractComponent } from './double-contract/double-contract.component';
import { NgbModalModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    SingleContractComponent,
    DoubleContractComponent
  ],
  imports: [
    CommonModule,
    ShareRoutingModule,
    NgbModalModule,

  ],
  exports: [SingleContractComponent, DoubleContractComponent],
  providers: [    
    NgbActiveModal,
  ]
})
export class ShareModule { }
