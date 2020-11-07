import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { Member } from 'src/app/models/member';
import { Photo } from 'src/app/models/photo';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import { MembersService } from '../members.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() member: Member;
  user: User;
  isCollapsed: boolean;
  public isMenuCollapsed = true;

  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;

  constructor(private _authService: AuthService,
              private _membersService: MembersService) { }

  ngOnInit(): void {
    this.isCollapsed = false;
    this._authService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
    });

    this.initializeUploader();
  }

  fileOverBase(event: any) {
    this.hasBaseDropZoneOver = event;
  }

  initializeUploader(): void {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/add-photo',
      authToken: `Bearer ${this.user.token}`,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo = JSON.parse(response);
        this.member.photos.push(photo);
        this.isCollapsed = false;
      }
    };
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  setMainPhoto(photo: Photo): void {
    this._membersService.setMainPhoto(photo.id).subscribe(() => {
      this.user.photoUrl = photo.url;
      this._authService.setCurrentUser(this.user);
      this.member.photoUrl = photo.url;

      this.member.photos.forEach(p => {
        if (p.isMain) {
          p.isMain = false;
        }

        if (p.id === photo.id) {
          p.isMain = true;
        }
      });
    });
  }

}
