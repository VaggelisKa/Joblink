import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Member } from '../models/member';


@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private _router: Router,
              private _http: HttpClient) { }

  getMembers(): Observable<Member[]> {
    return this._http.get<Member[]>(this.baseUrl + 'users');
  }

  getMemberByUsername(username: string): Observable<Member> {
    return this._http.get<Member>(this.baseUrl + `users/${username}`);
  }
}
