import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'src/app/messages/message.service';
import { Message } from 'src/app/models/message';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @Input() username: string;
  messages: Message[];

  constructor(private _messageService: MessageService) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages(): void {
    this._messageService.getMessageThread(this.username).subscribe(messages => {
      this.messages = messages;
      console.log(this.messages);
    });
  }

}
