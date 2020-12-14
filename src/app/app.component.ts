import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { AuthService } from './auth/auth.service';
import { PresenceService } from './messages/services/Presence.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'dating-app-SPA';

  constructor(private _authService: AuthService,
              private _presenceService: PresenceService) {}

  ngOnInit() {
    this.setCurrentUser();
  }

  setCurrentUser(): void {
    const user: User = JSON.parse(localStorage.getItem('CurrentUser'));
    if (user) {
      this._authService.setCurrentUser(user);
      this._presenceService.createHubConnection(user);
    }
  }
}
