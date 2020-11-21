import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PaginationService } from 'src/app/shared/services/pagination.service';

import { environment } from 'src/environments/environment';
import { Member } from '../../models/member';
import { PaginatedResult } from '../../models/pagination';
import { UserParams } from '../../models/userParams';


@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private readonly baseUrl = environment.apiUrl;
  members: Member[] = [];
  memberCache = new Map();

  constructor(private _http: HttpClient,
              private _paginationService: PaginationService) { }

  getMembers(userParams: UserParams): Observable<PaginatedResult<Member[]>> {
    const response = this.memberCache.get(Object.values(userParams).join('-'));
    if (response) {
      return of(response);
    }
    
    const { 
      pageNumber, 
      pageSize, 
      minAge, 
      maxAge, 
      gender,
      orderBy 
    } = userParams;
    sessionStorage.setItem('User Params', JSON.stringify(userParams));

    let params = this._paginationService.getPaginationHeaders(pageNumber, pageSize);
    params = params.append('minAge', minAge.toString());
    params = params.append('maxAge', maxAge.toString());
    params = params.append('gender', gender);
    params = params.append('orderBy', orderBy);

    return this._paginationService.getPaginatedResults<Member[]>(this.baseUrl + 'users', params)
      .pipe(
        map(res => {
          this.memberCache.set(Object.values(userParams).join('-'), res);
          return res;
        }),
        catchError((error) => {
          this.memberCache.clear();
          return of(error);
        })
      );
  }


  getMemberByUsername(username: string): Observable<Member> {
    const member = [...this.memberCache.values()]
        .reduce((arr, elem) => arr.concat(elem.result), [])
        .find((m: Member)  => m.username === username);

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

  deletePhoto(photoId: number): Observable<any> {
    return this._http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }
}
