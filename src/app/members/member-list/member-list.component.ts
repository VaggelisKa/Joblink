import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { Member } from 'src/app/models/member';
import { Pagination } from 'src/app/models/pagination';
import { User } from 'src/app/models/user';
import { UserParams } from 'src/app/models/userParams';
import { MembersService } from '../members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  members: Member[];
  pagination: Pagination;
  userParams: UserParams;
  user: User;
  typeOfUsersList = [
    {
      value: 'employer', 
      display: 'Employers'
    },
    {
      value: 'employee',
      display: 'Employees'
    }
  ];

  constructor(private _membersService: MembersService,
              private _authService: AuthService) { }

  ngOnInit(): void {
    this._authService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
      this.userParams = new UserParams(user);
    });

    this.loadMembers();
  }

  loadMembers(): void {
    this._membersService.getMembers(this.userParams).subscribe(response => {
      this.members = response.result;
      this.pagination = response.pagination;
    });
  }

  resetFilters(): void {
    this.userParams = new UserParams(this.user);
    this.loadMembers();
  }

  pageChanged(event: any): void {
    this.userParams.pageNumber = event.page;
    this.loadMembers();
  }

}
