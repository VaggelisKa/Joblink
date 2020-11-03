import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  requestCount = 0;

  constructor(private _spinner: NgxSpinnerService) { }

  busy(): void {
    this.requestCount++;
    this._spinner.show(undefined, {
      type: 'ball-running-dots',
      bdColor: 'rgba(255,255,255,0)',
      color: '#333'
    });
  }

  idle(): void {
    this.requestCount--;
    if (this.requestCount <= 0) {
      this.requestCount = 0;
      this._spinner.hide();
    }
  }
}
