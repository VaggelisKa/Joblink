import { NgModule } from '@angular/core';
import { RoleModalComponent } from './role-modal/role-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
    declarations: [
        RoleModalComponent,
        ConfirmDialogComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ModalModule.forRoot()
    ],
    exports: [
        RoleModalComponent,
        ModalModule
    ]
})
export class ModalsModule {}
