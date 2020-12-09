import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/models/user';


@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit {
  @Input() appHasRole: string[];
  user: User;

  constructor(private _viewContainerRef: ViewContainerRef,
              private _templateRef: TemplateRef<any>,
              private _authService: AuthService) {
                  this._authService.currentUser$.pipe(take(1)).subscribe(user => {
                    this.user = user;
                  });
               }

  ngOnInit(): void {
    if (!this.user?.roles || this.user == null) {
      this._viewContainerRef.clear();
      return;
    }

    if (this.user?.roles.some(r => this.appHasRole.includes(r))) {
      this._viewContainerRef.createEmbeddedView(this._templateRef);
    } else {
      this._viewContainerRef.clear();
    }
  }

}
