import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'dating-app-SPA';

  constructor(private _authService: AuthService) {}

  ngOnInit() {
    this.setCurrentUser();
  }

  setCurrentUser(): void {
    const user: User = JSON.parse(localStorage.getItem('CurrentUser'));
    this._authService.setCurrentUser(user);
  }
}
