import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { ErrorDisplayComponent } from './components/error-display/error-display.component';



@NgModule({
  declarations: [ErrorDisplayComponent],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
       positionClass: 'toast-bottom-right'
    }),
  ],
  exports: [
    BsDropdownModule,
    ToastrModule,
    ErrorDisplayComponent
  ]
})
export class SharedModule { }
