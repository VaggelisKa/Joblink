import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
      username: new FormControl(),
      password: new FormControl(),
      confirmPassword: new FormControl()
    });
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
