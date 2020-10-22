import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../models/user';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  currentUser$: Observable<User>;

  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this.currentUser$ = this._authService.currentUser$;
  }

  onLogin(): void {
    this._authService.login(this.model).subscribe(response => {

    }, error => {
      console.log(error);
    });
  }

  logout(): void {
    this._authService.logout();
  }

}
