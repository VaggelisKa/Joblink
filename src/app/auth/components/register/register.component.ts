import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  @Output() cancelRegistration = new EventEmitter<boolean>();

  constructor(private _authService: AuthService,
              private _toastr: ToastrService) { }

  ngOnInit() {
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
