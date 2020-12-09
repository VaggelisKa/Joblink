import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-role-modal',
  templateUrl: './role-modal.component.html',
  styleUrls: ['./role-modal.component.css']
})
export class RoleModalComponent implements OnInit {
  @Input() updateSelectedRoles = new EventEmitter();
  user: User;
  roles: any[];
 
  constructor(public bsModalRef: BsModalRef) {}
 
  ngOnInit() {
    
  }

  updateRoles() {
    console.log(this.roles);
    this.updateSelectedRoles.emit(this.roles);
    this.bsModalRef.hide();
  }

}
