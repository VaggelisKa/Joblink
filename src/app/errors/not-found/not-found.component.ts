import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  statusCode = '404';
  detailsMessage = 'Page not found!';

  constructor(private _router: Router) { }

  ngOnInit() {

  }

  redirect(): void {
    this._router.navigateByUrl('/');
  }

}
