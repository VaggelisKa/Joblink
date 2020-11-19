import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { BsYearsCalendarViewComponent } from 'ngx-bootstrap/datepicker/themes/bs/bs-years-calendar-view.component';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { Member } from 'src/app/models/member';
import { User } from 'src/app/models/user';
import { MembersService } from '../services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  member: Member;
  user: User;
  editorConfig: AngularEditorConfig;

  @ViewChild('editForm') editForm: NgForm;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  
  constructor(private _authService: AuthService,
              private _membersService: MembersService,
              private _toastr: ToastrService,
              private _router: Router
            ) { }

  ngOnInit(): void {
    this._authService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
    this.loadMember();

    this.editorConfig = {
      editable: true,
      spellcheck: true,
      translate: 'yes',
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      uploadWithCredentials: false,
      sanitize: false,
      toolbarPosition: 'top',
      toolbarHiddenButtons: [
        ['bold'],
        [
          'link',
          'unlink',
          'insertImage',
          'insertVideo',
          'customClasses',
          'indent',
          'outdent',
        ]
      ]
    };
  }

  loadMember(): void {
    this._membersService.getMemberByUsername(this.user.username).subscribe(member => this.member = member);
  }

  updateMember(): void {
    this._membersService.updateMemberProfile(this.member).subscribe((_) => {
      this._toastr.success('Your profile was successfully updated!');
      this.editForm.reset(this.member);
      this._router.navigateByUrl(`/members/${this.member.username}`);
    });
  }
}
