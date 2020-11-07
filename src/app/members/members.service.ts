import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Member } from '../models/member';


@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private readonly baseUrl = environment.apiUrl;
  members: Member[] = [];

  constructor(private _http: HttpClient) { }

  getMembers(): Observable<Member[]> {
    if (this.members.length > 0) {
      return of(this.members);
    }

    return this._http
      .get<Member[]>(this.baseUrl + 'users')
      .pipe(
        map(members => {
          this.members = members;
          return members;
        })
      );
  }

  getMemberByUsername(username: string): Observable<Member> {
    const member = this.members.find(x => x.username === username);
    if (member) {
      return of(member);
    }

    return this._http.get<Member>(this.baseUrl + `users/${username}`);
  }

  updateMemberProfile(member: Member): Observable<any> {
    return this._http
      .put(this.baseUrl + 'users', member)
      .pipe(
        map((_) => {
          const index = this.members.indexOf(member);
          this.members[index] = member;
        })
      );
  }

  setMainPhoto(photoId: number): Observable<any> {
    return this._http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }
}
