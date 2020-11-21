import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Member } from 'src/app/models/member';
import { Pagination } from 'src/app/models/pagination';

@Component({
  selector: 'app-pagination-field',
  templateUrl: './pagination-field.component.html',
  styleUrls: ['./pagination-field.component.css']
})
export class PaginationFieldComponent implements OnInit {
  @Input() pagination: Pagination;
  @Input() members: Partial<Member[]>;
  @Output() pageChangedEvent: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  pageChanged(event: any): void {
    this.pageChangedEvent.emit(event);
  }

}
