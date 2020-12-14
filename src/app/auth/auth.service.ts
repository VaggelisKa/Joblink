import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

import { environment } from '../../environments/environment';
import { MembersService } from '../members/services/members.service';
import { LikesService } from '../members/services/likes.service';
import { PresenceService } from '../messages/services/Presence.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = environment.apiUrl;

  private _userSource = new ReplaySubject<User>(1);
  currentUser$ = this._userSource.asObservable();

  constructor(private _http: HttpClient, 
              private _membersService: MembersService,
              private _likesService: LikesService,
              private _presenceService: PresenceService) { }

  login(model: any): Observable<any> {
    return this._http
      .post<{token: string}>(this.baseUrl + 'account/login', model)
      .pipe(
        map((response: User) => {
          const user = response;
          if (user) {
            this.setCurrentUser(user);
            this._presenceService.createHubConnection(user);
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
            this._presenceService.createHubConnection(user);
          }
        })
      );
  }

  setCurrentUser(user: User): void {
    user.roles = [];

    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);

    this._userSource.next(user);
    localStorage.setItem('CurrentUser', JSON.stringify(user));
  }

  logout(): void {
    localStorage.removeItem('CurrentUser');
    sessionStorage.removeItem('User Params');

    this._membersService.memberCache?.clear();
    this._likesService.likesCache?.clear();
    this._userSource.next(null);
    this._presenceService.stopHubConnection();
  }

  getDecodedToken(token: string): any {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
