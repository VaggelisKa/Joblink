import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TimeagoModule } from 'ngx-timeago';
import { SharedModule } from '../shared/shared.module';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
    declarations: [
        MessagesComponent
    ],
    imports: [
        SharedModule,
        RouterModule,
        TimeagoModule.forRoot(),
    ]
})
export class MessageModule {}
