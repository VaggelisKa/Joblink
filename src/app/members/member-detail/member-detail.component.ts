import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { AllHtmlEntities } from 'html-entities';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { MessageService } from 'src/app/messages/services/message.service';
import { PresenceService } from 'src/app/messages/services/Presence.service';
import { Member } from 'src/app/models/member';
import { Message } from 'src/app/models/message';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  @ViewChild('memberTabset', { static: true }) memberTabset: TabsetComponent;
  activeTab: TabDirective;

  member: Member;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  messages: Message[] = [];
  skillsTextConvertion: string;

  constructor(private _route: ActivatedRoute,
              private _messageService: MessageService,
              public _presenceService: PresenceService) { }

  ngOnInit() {
    this._route.data.subscribe(data => {
      this.member = data.member;
      this.member.skills = AllHtmlEntities.decode(data.member.skills);
    });

    this._route.queryParams.subscribe(params => {
      params.tab ? this.selectMessagesTab(params.tab) : this.selectMessagesTab(0);
    });

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];

    this.galleryImages = this.getMemberImages();
  }

  getMemberImages(): NgxGalleryImage[] {
    const imageUrls = [];
    for (const photo of this.member.photos) {
      imageUrls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url
      });
    }

    return imageUrls;
  }

  loadMessages(): void {
    this._messageService.getMessageThread(this.member.username).subscribe(messages => {
      this.messages = messages;
    });
  }

  selectMessagesTab(tabId: number): void {
    this.memberTabset.tabs[tabId].active = true;
  }

  onTabActivated(data: TabDirective): void {
    this.activeTab = data;
    if (this.activeTab.heading === 'Messages' && this.messages.length === 0) {
      this.loadMessages();
    }
  }
}
