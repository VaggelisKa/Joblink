import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Message } from '../../models/message';
import { PaginatedResult } from '../../models/pagination';
import { PaginationService } from '../../shared/services/pagination.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private readonly baseUrl = environment.apiUrl + 'messages';

  constructor(
    private _paginationService: PaginationService,
    private _http: HttpClient) { }

  getMessages(pageNumber: number, pageSize: number, container: string): Observable<PaginatedResult<Message[]>> {
    let params = this._paginationService.getPaginationHeaders(pageNumber, pageSize);
    params = params.append('Container', container);

    return this._paginationService.getPaginatedResults<Message[]>(this.baseUrl, params);
  }

  getMessageThread(username: string): Observable<Message[]> {
    return this._http.get<Message[]>(this.baseUrl + '/thread/' + username);
  }
  
  sendMessage(username: string, content: string): Observable<Message> {
    const messageType = {
      recipientUsername: username,
      content
    };

    return this._http.post<Message>(this.baseUrl, messageType);
  }

  deleteMessage(messageId: number): Observable<any> {
    return this._http.delete(this.baseUrl + '/' + messageId);
  }

}
