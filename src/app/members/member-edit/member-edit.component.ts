import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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
  @ViewChild('editForm') editForm: NgForm;
  
  member: Member;
  user: User;

  constructor(private _authService: AuthService,
              private _membersService: MembersService,
              private _toastr: ToastrService
            ) { }

  ngOnInit(): void {
    this._authService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
    this.loadMember();
  }

  loadMember(): void {
    this._membersService.getMemberByUsername(this.user.username).subscribe(member => this.member = member);
  }

  updateMember(): void {
    console.log(this.member);
    this._toastr.success('Your profile was successfully updated!');
    this.editForm.reset(this.member);
  }
}
