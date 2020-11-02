import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { Member } from 'src/app/models/member';
import { User } from 'src/app/models/user';
import { MembersService } from '../members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  member: Member;
  user: User;

  constructor(private _authService: AuthService,
              private _membersService: MembersService) { }

  ngOnInit(): void {
    this._authService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
    this.loadMember();
  }

  loadMember(): void {
    this._membersService.getMemberByUsername(this.user.username).subscribe(member => this.member = member);
  }
}
