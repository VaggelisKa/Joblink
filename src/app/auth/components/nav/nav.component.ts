import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../../models/user';

import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @ViewChild('loginForm') loginForm: NgForm;

  model: any = {};
  currentUser$: Observable<User>;
  username = '';

  constructor(private _authService: AuthService,
              private _router: Router) { }

  ngOnInit() {
    this.currentUser$ = this._authService.currentUser$;
  }

  onLogin(): void {
    this._authService.login(this.model).subscribe((_) => {
      this._router.navigateByUrl('/members');
      this.loginForm.resetForm();
    });
  }

  logout(): void {
    this._authService.logout();
    this._router.navigateByUrl('/');
  }

}
