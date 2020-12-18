import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _authService: AuthService,
              private _toastr: ToastrService) {}

  canActivate(): Observable<boolean> {
    return this._authService.currentUser$.pipe(
      map(user => {
        if (user) {
          return true;
        }
        this._toastr.error('You are not authorized to view this content, please log in first!');
      })
    );
  }
}
