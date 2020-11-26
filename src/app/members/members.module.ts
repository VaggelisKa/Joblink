import { NgModule } from '@angular/core';

import { MemberCardComponent } from './member-card/member-card.component';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { MemberListComponent } from './member-list/member-list.component';
import { PhotoEditorComponent } from './photo-editor/photo-editor.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { TimeagoModule } from 'ngx-timeago';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { MemberMessagesComponent } from './member-messages/member-messages.component';


@NgModule({
    declarations: [
        MemberListComponent,
        MemberDetailComponent,
        MemberEditComponent,
        PhotoEditorComponent,
        MemberCardComponent,
        MemberMessagesComponent
    ],
    imports: [
        RouterModule,
        TabsModule.forRoot(),
        AngularEditorModule,
        TimeagoModule.forRoot(),
        NgxGalleryModule,
        FileUploadModule,
        SharedModule,
        
    ],
    exports: [
        MemberCardComponent,
    ]
})

export class MembersModule {}
