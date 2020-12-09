import { NgModule } from '@angular/core';

import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { PhotoManagementComponent } from './photo-management/photo-management.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { DirectivesModule } from '../shared/directives/directives.module';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        AdminPanelComponent,
        UserManagementComponent,
        PhotoManagementComponent,
    ],
    imports: [
        CommonModule,
        TabsModule.forRoot(),
        DirectivesModule
    ]
})

export class AdminModule {}
