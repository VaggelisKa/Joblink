import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { ToastrModule } from 'ngx-toastr';
import { ErrorDisplayComponent } from './components/error-display/error-display.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TextInputComponent } from './components/forms/text-input/text-input.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DateInputComponent } from './components/forms/date-input/date-input.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { PaginationFieldComponent } from './components/pagination-field/pagination-field.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DropdownFilterComponent } from './components/dropdown-filter/dropdown-filter.component';
import { NoSanitizePipe } from './pipes/noSanitize.pipe';
import { ModalsModule } from './modals/modals.module';


@NgModule({
  declarations: [
    ErrorDisplayComponent, 
    TextInputComponent, 
    DateInputComponent, 
    NoSanitizePipe,
    PaginationFieldComponent,
    DropdownFilterComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
       positionClass: 'toast-bottom-right'
    }),
    NgxSpinnerModule,
    NgbModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    ModalsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    BsDropdownModule,
    ToastrModule,
    ErrorDisplayComponent,
    NgxSpinnerModule,
    NgbModule,
    TextInputComponent,
    DateInputComponent,
    PaginationModule,
    ButtonsModule,
    NoSanitizePipe,
    PaginationFieldComponent,
    DropdownFilterComponent,
    ModalsModule
  ]
})
export class SharedModule { }
