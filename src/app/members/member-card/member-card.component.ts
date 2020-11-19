import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/models/member';
import { LikesService } from '../services/likes.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() member: Member;

  constructor(private _likesService: LikesService,
              private _toastr: ToastrService) { }

  ngOnInit(): void {
  }

  addLike(member: Member) {
    this._likesService.addLike(member.username).subscribe((_) => {
      this._toastr.success('You have liked ' + member.username + ', a link might be formed...');
    });
  }

}
