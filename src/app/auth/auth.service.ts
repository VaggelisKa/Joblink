import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = environment.apiUrl;

  private _userSource = new ReplaySubject<User>(1);
  currentUser$ = this._userSource.asObservable();

  constructor(private _http: HttpClient) { }

  login(model: any): Observable<any> {
    return this._http
      .post<{token: string}>(this.baseUrl + 'account/login', model)
      .pipe(
        map((response: User) => {
          const user = response;
          if (user) {
            this.setCurrentUser(user);
          }
        })
      );
  }

  register(model: any): Observable<any> {
    return this._http
      .post(this.baseUrl + 'account/register', model)
      .pipe(
        map((user: User) => {
          if (user) {
            this.setCurrentUser(user);
          }
        })
      );
  }

  setCurrentUser(user): void {
    this._userSource.next(user);
    localStorage.setItem('CurrentUser', JSON.stringify(user));
  }

  logout(): void {
    localStorage.removeItem('CurrentUser');
    sessionStorage.removeItem('userParams');
    this._userSource.next(null);
  }
}
