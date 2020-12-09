import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: Partial<User[]>;

  constructor(private _adminService: AdminService) { }

  ngOnInit() {
    this.getUsersWithRoles();
  }

  getUsersWithRoles(): void {
    this._adminService.getUserWithRoles().subscribe(users => {
      this.users = users;
    });
  }

}
