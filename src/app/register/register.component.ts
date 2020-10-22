import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  @Output() cancelRegistration = new EventEmitter<boolean>();

  constructor(private _authService: AuthService) { }

  ngOnInit() {
  }

  register() {
    this._authService.register(this.model).subscribe(user => {
      console.log(user);
    }, error => {
      console.log(error);
    });
  }

  cancel() {
    console.log('cancelled');
    this.cancelRegistration.emit(false);
  }

}
