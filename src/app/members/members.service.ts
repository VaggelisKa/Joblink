import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Member } from '../models/member';
import { PaginatedResult } from '../models/pagination';
import { UserParams } from '../models/userParams';


@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private readonly baseUrl = environment.apiUrl;
  members: Member[] = [];
  memberCache = new Map();

  constructor(private _http: HttpClient) { }

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

    let params = this.getPaginationHeaders(pageNumber, pageSize);
    params = params.append('minAge', minAge.toString());
    params = params.append('maxAge', maxAge.toString());
    params = params.append('gender', gender);
    params = params.append('orderBy', orderBy);

    return this.getPaginatedResults<Member[]>(this.baseUrl + 'users', params)
      .pipe(
        map(res => {
          this.memberCache.set(Object.values(userParams).join('-'), res);
          return res;
        })
      );
  }

  private getPaginationHeaders(pageNumber: number, pageSize: number): HttpParams {
    let params = new HttpParams();
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    return params;
  }

  private getPaginatedResults<T>(url: string, params: HttpParams): Observable<PaginatedResult<T>> {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();

    return this._http
      .get<T>(url, {observe: 'response', params})
      .pipe(
        map(response => {
          paginatedResult.result = response.body;

          if (response.headers.get('Pagination')) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }

          return paginatedResult;
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
