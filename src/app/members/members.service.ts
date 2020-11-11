import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Member } from '../models/member';
import { PaginatedResult } from '../models/pagination';


@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private readonly baseUrl = environment.apiUrl;
  members: Member[] = [];
  paginatedResult: PaginatedResult<Member[]> = new PaginatedResult<Member[]>();

  constructor(private _http: HttpClient) { }

  getMembers(page?: number, itemsPerPage?: number): Observable<PaginatedResult<Member[]>> {
    let params = new HttpParams();

    if (page && itemsPerPage) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }

    return this._http
      .get<Member[]>(this.baseUrl + 'users', {observe: 'response', params})
      .pipe(
        map(response => {
          this.paginatedResult.result = response.body;

          if (response.headers.get('Pagination')) {
            this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }

          return this.paginatedResult;
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

  deletePhoto(photoId: number): Observable<any> {
    return this._http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
  }
}
