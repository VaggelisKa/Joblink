import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../modals/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {
  bsModalRef: BsModalRef;
  
  constructor(private _modalService: BsModalService) { }

  confirm(
    title = 'Confirmation', 
    message = 'Are you sure? Any unsaved changes will be lost',
    btnOkText = 'Yes',
    btnCancelText = 'Cancel'): Observable<boolean> {
      const config = {
        initialState: {
          title,
          message,
          btnOkText,
          btnCancelText
        }
      };

      this.bsModalRef = this._modalService.show(ConfirmDialogComponent, config);
      
      return new Observable<boolean>(this.getResult());
    }

    private getResult(): any {
      return (observer) => {
        const subscription = this.bsModalRef.onHidden.subscribe(() => {
          observer.next(this.bsModalRef.content.hasConfirmed);
          observer.complete();
        });

        return {
          unsubscribe() {
            subscription.unsubscribe();
          }
        };
      };
    }
}
