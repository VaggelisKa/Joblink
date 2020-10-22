import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = 'https://localhost:5001/api/account/';

  constructor(private _http: HttpClient) { }

  login(model: any): Observable<any> {
    return this._http.post<{token: string}>(this.baseUrl + 'login', model);
      // .pipe(
      //   map((response) => {
      //     const user = response;
      //     console.log(user);
      //     if (user) {
      //       localStorage.setItem('token', user.token);
      //     }
      //   })
      // );
  }
}
