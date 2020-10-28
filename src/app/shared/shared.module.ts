import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { ErrorDisplayComponent } from './components/error-display/error-display.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { map } from 'rxjs/operators';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';



@NgModule({
  declarations: [ErrorDisplayComponent],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
       positionClass: 'toast-bottom-right'
    }),
    TabsModule.forRoot(),
    NgxGalleryModule
  ],
  exports: [
    BsDropdownModule,
    ToastrModule,
    ErrorDisplayComponent,
    TabsModule,
    NgxGalleryModule
  ]
})
export class SharedModule { }
