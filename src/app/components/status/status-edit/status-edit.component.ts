import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

import { StatusService } from '../../../services/status.service';
import { Status } from '../../../model/status';
import { DialogsServiceService } from '../../../services/dialogs-service.service';

import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { Router } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Angular2TokenService } from 'angular2-token';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


import { ColorPickerComponent } from '../../../utils/color-picker/color-picker.component';


@Component({
  selector: 'app-status-edit',
  templateUrl: './status-edit.component.html',
  styleUrls: ['./status-edit.component.css']
})
export class StatusEditComponent implements OnInit {

  statusForm: FormGroup;
  status: Status;
  @Input() errors: string[];
  @Input() success: string;

  color: string;

  constructor(
      private dialogsService: DialogsServiceService,
      private statusService: StatusService,
	    private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      public snackBar: MatSnackBar,
      private _router: Router,
      public dialog: MatDialog,
      private _tokenService: Angular2TokenService
  	) {

    this._tokenService.validateToken().subscribe(
      res =>      console.log("Token Valid!"),
      error =>    this._handleTokenError(error)
    );

     }

ngOnInit() {
	this.createForm();

    this.route.params
      .switchMap((params: Params) => this.statusService.getStatus(+params['id']))
      .subscribe(status => this._handleGetPlaceSuccess(status));
  }


  public openDialog() {
    this.dialogsService
      .confirm('Confirmar', '¿Seguro que quiere eliminar?')
      .subscribe(res => this.deleteStatus(res));
  }


	private createForm()
	{
    this.statusForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      color: ['', [Validators.required]]
    });
	}

  private _handleGetPlaceSuccess(status: Status)
  {
    this.status = status;

    this.color = status.color;

    this.statusForm.setValue({
      name: status.name,
      color: status.color
    });
  }

  updateStatus()
  {
  	this.statusService.updateStatus(this.status.id, this.statusForm.value).then(
  		res => this._handleUpdateSuccess(res),
  		error => this._handleError(error)
  	);
  }

  deleteStatus(res: boolean): void
  {
    if(res) {
      this.statusService.deleteStatus(this.status.id).then((data) => {
        this._router.navigate(['statuses/list']);
      });
    }
  }

  openColorPickerDialog(): void {
    let dialogRef = this.dialog.open(ColorPickerComponent, {
      width: '618px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.color = result;
    });
  }

  private _handleUpdateSuccess(data: any) {
    this.errors = null;
    this.snackBar.open("Actualizado correctamente", undefined, {
      duration: 2000,
    });
    this._router.navigate(['/statuses/list']);
  }

  private _handleError(error: any) {
      this.errors = error.json().errors.full_messages;
  }

  private _handleTokenError(error: any) {
    var config: MatSnackBarConfig = new MatSnackBarConfig();
    config.duration = 1000;
    this.snackBar.open("Su sesión ha expirado.", undefined, config);
    this._router.navigate(['/signin']);
  }
}
