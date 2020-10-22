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

  private userSource = new ReplaySubject<User>(1);
  currentUser$ = this.userSource.asObservable();

  constructor(private _http: HttpClient) { }

  login(model: any): Observable<any> {
    return this._http
      .post<{token: string}>(this.baseUrl + 'login', model)
      .pipe(
        map((response: User) => {
          const user = response;
          if (user) {
            localStorage.setItem('CurrentUser', JSON.stringify(user));
            this.userSource.next(user);
          }
        })
      );
  }

  setCurrentUser(user): void {
    this.userSource.next(user);
  }

  logout(): void {
    localStorage.removeItem('CurrentUser');
    this.userSource.next(null);
  }
}
