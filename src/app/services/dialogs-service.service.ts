import { Observable } from 'rxjs/Rx';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';
import { DialogComponent } from './.././utils/dialog/dialog.component';

@Injectable()
export class DialogsServiceService {

  constructor(private dialog: MdDialog) { }
  public confirm(title: string, message: string): Observable<boolean> {

        let dialogRef: MdDialogRef<DialogComponent>;

        dialogRef = this.dialog.open(DialogComponent);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;

        return dialogRef.afterClosed();
    }
}
