import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-display',
  templateUrl: './error-display.component.html',
  styleUrls: ['./error-display.component.css']
})
export class ErrorDisplayComponent implements OnInit {
  @Input() statusCodeMessage: string;
  @Input() detailsMessage: string;

  constructor(private _router: Router) { }

  ngOnInit() {
    
  }

  redirect() {
    this._router.navigateByUrl('/');
  }

}
