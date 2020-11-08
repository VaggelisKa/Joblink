import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegistration = new EventEmitter<boolean>();

  model: any = {};
  minDate: Date;
  maxDate: Date;
  registerForm: FormGroup;

  constructor(private _authService: AuthService,
              private _toastr: ToastrService,
              private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initializeForm();

    this.minDate = new Date();
    this.minDate.setFullYear(this.minDate.getFullYear() - 115);

    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 16);
  }

  initializeForm(): void {
    this.registerForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]],
      gender: ['employee'],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
    });
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value 
        ? null : {isMatching: true};
    };
  }

  register() {
    this._authService.register(this.model).subscribe(user => {
      console.log(user);
    }, error => {
      this._toastr.error(error);
    });
  }

  cancel() {
    console.log('cancelled');
    this.cancelRegistration.emit(false);
  }

}
