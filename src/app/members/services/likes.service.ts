import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LikesService {

  private readonly baseUrl = environment.apiUrl;
  
  constructor(private _http: HttpClient) { }
  
  addLike(username: string): Observable<any> {
    return this._http.post(this.baseUrl + 'likes/' + username, {});
  }

  getLikes(predicate: string): Observable<any> {
    return this._http.get(this.baseUrl + 'likes?=' + predicate);
  }

}
