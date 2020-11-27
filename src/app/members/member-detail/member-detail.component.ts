import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { AllHtmlEntities } from 'html-entities';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { MessageService } from 'src/app/messages/message.service';
import { Member } from 'src/app/models/member';
import { Message } from 'src/app/models/message';
import { MembersService } from '../services/members.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  @ViewChild('memberTabset') memberTabset: TabsetComponent;
  activeTab: TabDirective;

  member: Member;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  messages: Message[] = [];
  skillsTextConvertion: string;

  constructor(private _membersService: MembersService,
              private _route: ActivatedRoute,
              private _messageService: MessageService) { }

  ngOnInit() {
    this.loadMember();

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

  loadMember(): void {
    this._membersService.getMemberByUsername(this._route.snapshot.paramMap.get('username'))
      .subscribe(member => {
        this.member = member;
        this.member.skills = AllHtmlEntities.decode(member.skills);
        this.galleryImages = this.getMemberImages();
      });
  }

  loadMessages(): void {
    this._messageService.getMessageThread(this.member.username).subscribe(messages => {
      this.messages = messages;
    });
  }

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    if (this.activeTab.heading === 'Messages' && this.messages.length === 0) {
      this.loadMessages();
    }
  }
}
