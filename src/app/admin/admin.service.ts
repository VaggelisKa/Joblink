import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private readonly baseUrl = environment.apiUrl + 'admin';

  constructor(private _http: HttpClient) { }

  getUserWithRoles(): Observable<Partial<User[]>> {
    return this._http.get<Partial<User[]>>(this.baseUrl + '/users-with-roles');
  }

  updateUserRoles(username: string, roles: string | string[] ): Observable<any> {
    const url = this.baseUrl + '/edit-roles/' + username + '?roles=' + roles;
    return this._http.post(url, {});
  }

}
