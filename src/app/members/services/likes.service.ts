import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LikeParams } from 'src/app/models/likeParams';
import { Member } from 'src/app/models/member';
import { PaginatedResult } from 'src/app/models/pagination';
import { PaginationService } from 'src/app/shared/services/pagination.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LikesService {

  private readonly baseUrl = environment.apiUrl;
  
  constructor(private _http: HttpClient,
              private _paginationService: PaginationService) { }
  
  addLike(username: string): Observable<any> {
    return this._http.post(this.baseUrl + 'likes/' + username, {});
  }

  getLikes(likesParams: LikeParams): Observable<PaginatedResult<Member[]>> {
    const { 
      predicate,
      pageNumber,
      pageSize 
    } = likesParams;

    const params = this._paginationService.getPaginationHeaders(pageNumber, pageSize);

    return this._paginationService.getPaginatedResults<Member[]>(this.baseUrl + `likes?predicate=${predicate}`, params);
  }

}
