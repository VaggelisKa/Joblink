import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css']
})
export class ServerErrorComponent implements OnInit {
  statusCode = '';
  detailsMessage = '';
  error: any;
  
  constructor(private _router: Router) {
    const navigation = this._router.getCurrentNavigation();
    this.error = navigation?.extras?.state?.error;

    this.statusCode = '500';
    this.detailsMessage = 'Internal server error, try refreshing the page!';
   }

  ngOnInit() {
  }

}
