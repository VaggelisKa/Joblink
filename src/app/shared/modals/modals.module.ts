import { NgModule } from '@angular/core';
import { RoleModalComponent } from './role-modal/role-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        RoleModalComponent
    ],
    imports: [
        CommonModule,
        ModalModule.forRoot()
    ],
    exports: [
        RoleModalComponent,
        ModalModule
    ]
})
export class ModalsModule {}
