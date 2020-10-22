import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  isLoggedIn = false;

  constructor(private _authService: AuthService) { }

  ngOnInit() {

  }

  onLogin(): void {
    this._authService.login(this.model).subscribe(response => {
      console.log(response);
      this.isLoggedIn = true;
    }, error => {
      console.log(error);
    });
  }

  logout(): void {
    this.isLoggedIn = false;
  }

}
