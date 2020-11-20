import { Component, OnInit } from '@angular/core';
import { LikesService } from '../members/services/likes.service';
import { Member } from '../models/member';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  members: Partial<Member[]>;
  predicate = 'liked';

  constructor(private likesService: LikesService) { }

  ngOnInit() {
    this.loadLikes();
  }

  loadLikes(): void {
    this.likesService.getLikes(this.predicate).subscribe(response => {
      this.members = response;
    });
  }

}
