import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  title: string;
  message: string;
  btnOkText: string;
  btnCancelText: string;
  hasConfirmed: boolean;

  constructor(public _bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  confirm(): void {
    this.hasConfirmed = true;
    this._bsModalRef.hide();
  }

  cancel(): void {
    this.hasConfirmed = false;
    this._bsModalRef.hide();
  }

}
