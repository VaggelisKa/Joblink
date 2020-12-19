import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Group } from 'src/app/models/group';
import { User } from 'src/app/models/user';
import { BusyService } from 'src/app/shared/services/busy.service';
import { ConfirmService } from 'src/app/shared/services/confirm.service';
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
  messageThread$ = this._messageThreadSource.asObservable();

  constructor(
    private _paginationService: PaginationService,
    private _http: HttpClient,
    private _confirmService: ConfirmService,
    private _busyService: BusyService) { }

  createHubConnection(user: User, receiverUsername: string): void {
    this._busyService.busy();
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + '?user=' + receiverUsername, {
        accessTokenFactory: () => user.token
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .catch(error => console.log(error))
      .finally(() => this._busyService.idle());

    this.hubConnection.on('ReceiveMessageThread', messages => {
      this._messageThreadSource.next(messages);
    });

    this.hubConnection.on('NewMessage', message => {
      this.messageThread$.pipe(
        take(1),
        map(messages => {
          return [...messages, message];
        })
      ).subscribe(messages => this._messageThreadSource.next(messages));
    });

    this.hubConnection.on('UpdatedGroup', (group: Group) => {
      if (group.connections.some(x => x.username === receiverUsername)) {
        this.messageThread$.pipe(
          take(1)
        ).subscribe(messages => {
          messages.forEach(message => {
            if (!message.dateRead) {
              message.dateRead = new Date(Date.now());
            }
          });

          this._messageThreadSource.next([...messages]);
        });
      }
    });
  }

  stopHubConnection(): void {
    if (this.hubConnection) {
      this._messageThreadSource.next([]);
      this.hubConnection.stop();
    }
  }

  getMessages(pageNumber: number, pageSize: number, container: string): Observable<PaginatedResult<Message[]>> {
    let params = this._paginationService.getPaginationHeaders(pageNumber, pageSize);
    params = params.append('Container', container);

    return this._paginationService.getPaginatedResults<Message[]>(this.baseUrl, params);
  }

  getMessageThread(username: string): Observable<Message[]> {
    return this._http.get<Message[]>(this.baseUrl + '/thread/' + username);
  }
  
  async sendMessage(username: string, content: string): Promise<Message> {
    const messageType = {
      recipientUsername: username,
      content
    };

    return await this.hubConnection
      .invoke('SendMessage', messageType)
      .catch(error => console.log(error));
  }

  deleteMessage(messageId: number): Observable<any> {
    return this._http.delete(this.baseUrl + '/' + messageId);
  }

}
