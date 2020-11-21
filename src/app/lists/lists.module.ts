import { NgModule } from '@angular/core';
import { MembersModule } from '../members/members.module';
import { SharedModule } from '../shared/shared.module';
import { ListsComponent } from './lists.component';

@NgModule({
    declarations: [ListsComponent],
    imports: [
        SharedModule,
        MembersModule
    ]
})

export class ListsModule {}
