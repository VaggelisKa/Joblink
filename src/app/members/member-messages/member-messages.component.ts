import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService } from 'src/app/messages/services/message.service';
import { Message } from 'src/app/models/message';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @ViewChild('messageForm') messageForm: NgForm;
  @Input() messages: Message[];
  @Input() username: string;

  messageContent: string;
  loading = false;
  
  constructor(public _messageService: MessageService) { }

  ngOnInit() {
  }

  sendMessage(): void {
    this.loading = true;
    this._messageService.sendMessage(this.username, this.messageContent)
      .then((_) => {
        this.messageForm.reset();
      })
      .finally(() => this.loading = false);
  }

}
