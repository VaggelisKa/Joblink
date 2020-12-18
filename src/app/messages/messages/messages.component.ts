import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Message } from 'src/app/models/message';
import { Pagination } from 'src/app/models/pagination';
import { ConfirmService } from 'src/app/shared/services/confirm.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  container = 'Inbox';
  pageNumber = 1;
  pageSize = 5;

  constructor(private _messageService: MessageService,
              private _toastr: ToastrService,
              private _confirmService: ConfirmService) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages(): void {
    this._messageService.getMessages(
      this.pageNumber,
      this.pageSize,
      this.container
    ).subscribe(response => {
      this.messages = response.result;
      this.pagination = response.pagination;
    });
  }

  pageChanged(event: any): void {
    this.pageNumber = event.page;
    this.loadMessages();
  }

  filterClicked(event: string) {
    if (event) {
      this.container = event;
      this.loadMessages();
    }
  }

  deleteMessage(id: number): void {
    this._confirmService.confirm('Delete Confirmation', 'Are you sure you want to delete?')
    .subscribe(result => {
      if (result) {
        this._messageService.deleteMessage(id).subscribe((_) => {
          const messageIndex = this.messages.findIndex(m => m.id === id);
          this.messages.splice(messageIndex, 1);
          this.loadMessages();
    
          this._toastr.success('Message Deleted');
        });
      }
    });
  }
}
