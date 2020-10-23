import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  username = '';

  constructor(private _authService: AuthService,
              private _router: Router,
              private _toastr: ToastrService) { }

  ngOnInit() {
    this.currentUser$ = this._authService.currentUser$;
  }

  onLogin(): void {
    this._authService.login(this.model).subscribe((_) => {
      this._router.navigateByUrl('/members');
    }, error => {
      this._toastr.error(error.error);
    });
  }

  logout(): void {
    this._authService.logout();
    this._router.navigateByUrl('/');
  }

}
