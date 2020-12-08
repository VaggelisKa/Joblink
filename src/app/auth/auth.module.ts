import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { NavComponent } from './components/nav/nav.component';
import { RegisterComponent } from './components/register/register.component';
import { HasRoleDirective } from './has-role.directive';



@NgModule({
    declarations: [	
        NavComponent,
        RegisterComponent,
        HasRoleDirective
   ],
    imports: [
        ReactiveFormsModule,
        SharedModule,
        RouterModule,
    ],
    exports: [
        NavComponent,
        RegisterComponent,
    ]
})

export class AuthModule {}
