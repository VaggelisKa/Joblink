import { NgModule } from '@angular/core';

import { AuthModule } from '../auth/auth.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        SharedModule,
        AuthModule
    ]
})

export class HomeModule {}
