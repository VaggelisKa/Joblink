import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import { Message } from '../../models/message';
import { PaginatedResult } from '../../models/pagination';
import { PaginationService } from '../../shared/services/pagination.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private readonly baseUrl = environment.apiUrl + 'messages';
  private readonly hubUrl = environment.hubUrl + 'message';

  private hubConnection: HubConnection;
  private _messageThreadSource = new BehaviorSubject<Message[]>([]);
  private messageThread$ = this._messageThreadSource.asObservable();

  constructor(
    private _paginationService: PaginationService,
    private _http: HttpClient) { }

  createHubConnection(user: User, receiverUsername: string): void {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + '?user=' + receiverUsername, {
        accessTokenFactory: () => user.token
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .catch(error => console.log(error));

    this.hubConnection.on('ReceiveMessageThread', messages => {
      this._messageThreadSource.next(messages);
    });
  }

  stopHubConnection(): void {
    this.hubConnection.stop();
  }

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
