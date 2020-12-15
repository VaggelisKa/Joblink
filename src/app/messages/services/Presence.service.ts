import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  private readonly hubUrl = environment.hubUrl;
  private hubConnection: HubConnection;
  private _onlineUsersSource = new BehaviorSubject<string[]>([]);
  onlineUsers$ = this._onlineUsersSource.asObservable();

  constructor(private _toastr: ToastrService,
              private _router: Router) { }

  createHubConnection(user: User): void {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'presence', {
        accessTokenFactory: () => user.token
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .catch(error => console.log(error));

    this.hubConnection.on('UserIsOnline', username => {
      this.onlineUsers$
        .pipe(
          take(1),
          map(usernames => (
            [...usernames, username]
          ))
        )
        .subscribe(usernames => this._onlineUsersSource.next(usernames));
    });

    this.hubConnection.on('UserIsOffline', username => {
      this.onlineUsers$
      .pipe(
        take(1),
        map(usernames => (
          [...usernames.filter(u => u !== username)]
        ))
      )
      .subscribe(usernames => this._onlineUsersSource.next(usernames));
    });

    this.hubConnection.on('GetOnlineUsers', (usernames: string[]) => {
      this._onlineUsersSource.next(usernames);
    });

    this.hubConnection.on('NewMessageReceived', ({ username }) => {
      this._toastr.info('You have a new message from ' + username)
        .onTap
        .pipe(take(1))
        .subscribe(() => {
          console.log(username);
          this._router.navigateByUrl('/members/' + username + '?tab=1');
        });
    });
  }

  stopHubConnection(): void {
    this.hubConnection
      .stop()
      .catch(error => console.log(error));
  }

}
