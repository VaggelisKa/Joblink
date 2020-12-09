import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { User } from 'src/app/models/user';
import { RoleModalComponent } from 'src/app/shared/modals/role-modal/role-modal.component';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  bsModalRef: BsModalRef;
  users: Partial<User[]>;

  constructor(private _adminService: AdminService,
              private _modalService: BsModalService) { }

  ngOnInit() {
    this.getUsersWithRoles();
  }

  getUsersWithRoles(): void {
    this._adminService.getUserWithRoles().subscribe(users => {
      this.users = users;
    });
  }

  openRoleModal(): void {
    const initialState = {
      list: [
        'Open a modal with component',
        'Pass your data',
        'Do something else',
        '...'
      ],
      title: 'Modal with component'
    };
    this.bsModalRef = this._modalService.show(RoleModalComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
  }

}
