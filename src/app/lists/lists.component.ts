import { Component, OnInit } from '@angular/core';
import { LikesService } from '../members/services/likes.service';
import { LikeParams } from '../models/likeParams';
import { Member } from '../models/member';
import { Pagination } from '../models/pagination';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  members: Partial<Member[]>;
  likeParams: LikeParams;
  pagination: Pagination;

  constructor(private likesService: LikesService) { }

  ngOnInit() {
    this.likeParams = new LikeParams();
    this.loadLikes();
  }

  loadLikes(): void {
    this.likesService.getLikes(this.likeParams).subscribe(response => {
      this.members = response.result;
      this.pagination = response.pagination;
    });
  }

  pageChanged(event: any): void {
    this.likeParams.pageNumber = event.page;
    this.loadLikes();
  }

  filterClicked(event: string) {
    if (event) {
      this.likeParams.predicate = event;
      this.loadLikes();
    }
  }

}
