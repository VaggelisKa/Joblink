import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Member } from 'src/app/models/member';
import { MembersService } from '../services/members.service';

@Injectable({
    providedIn: 'root'
})
export class MemberDetailedResolver implements Resolve<Member> {
    
    constructor(private _memberService: MembersService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Member> {
        return this._memberService.getMemberByUsername(route.paramMap.get('username'));
    }

}
