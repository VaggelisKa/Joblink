import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
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
  registerForm: FormGroup;

  constructor(private _authService: AuthService,
              private _toastr: ToastrService) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm(): void {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, this.matchValues('password')])
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
