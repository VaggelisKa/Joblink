import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from 'src/app/models/member';
import { MembersService } from '../members.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  member: Member;

  constructor(private _membersService: MembersService,
              private _route: ActivatedRoute) { }

  ngOnInit() {
    this.loadMember();
  }

  loadMember(): void {
    this._membersService.getMemberByUsername(this._route.snapshot.paramMap.get('username'))
      .subscribe(member => this.member = member);
  }

}
