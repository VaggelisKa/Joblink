import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = 'https://localhost:5001/api/account/';

  private _userSource = new ReplaySubject<User>(1);
  currentUser$ = this._userSource.asObservable();

  constructor(private _http: HttpClient) { }

  login(model: any): Observable<any> {
    return this._http
      .post<{token: string}>(this.baseUrl + 'login', model)
      .pipe(
        map((response: User) => {
          const user = response;
          if (user) {
            this.saveUserToLocalStorage(user);
          }
        })
      );
  }

  register(model: any): Observable<any> {
    return this._http
      .post(this.baseUrl + 'register', model)
      .pipe(
        map((user: User) => {
          if (user) {
            this.saveUserToLocalStorage(user);
          }
        })
      );
  }

  private saveUserToLocalStorage(user: User): void {
    localStorage.setItem('CurrentUser', JSON.stringify(user));
    this._userSource.next(user);
  }

  setCurrentUser(user): void {
    this._userSource.next(user);
  }

  logout(): void {
    localStorage.removeItem('CurrentUser');
    this._userSource.next(null);
  }
}
