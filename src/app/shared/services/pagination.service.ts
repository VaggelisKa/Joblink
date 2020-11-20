import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginatedResult } from 'src/app/models/pagination';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

constructor(private _http: HttpClient) { }

getPaginationHeaders(pageNumber: number, pageSize: number): HttpParams {
  let params = new HttpParams();
  params = params.append('pageNumber', pageNumber.toString());
  params = params.append('pageSize', pageSize.toString());

  return params;
}

getPaginatedResults<T>(url: string, params: HttpParams): Observable<PaginatedResult<T>> {
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

}
