import { Component, OnInit, Input} from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { StatusService } from '../../../services/status.service';
import { Status } from '../../../model/status';

import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { CustomValidators } from 'ng2-validation';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';

import { ColorPickerComponent } from '../../../utils/color-picker/color-picker.component';

@Component({
  selector: 'app-status-new',
  templateUrl: './status-new.component.html',
  styleUrls: ['./status-new.component.css']
})
export class StatusNewComponent implements OnInit {
  status: Status;
  statusForm: FormGroup;
  @Input() errors: string[];
  @Input() success: string;

  color: string;

  constructor(
  	private statusService: StatusService,
  	private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private _router: Router,
    public dialog: MatDialog,
    private _tokenService: Angular2TokenService
  	) {
    this._tokenService.validateToken().subscribe(
      res =>      console.log("Token Valid!"),
      error =>    this._handleTokenError(error)
    );

  	this.createForm();

  	 }

  ngOnInit() {
  }


  createStatus()
  {
    this.statusService.createStatus(this.statusForm.value).then(
      res =>      this._handleUpdateSuccess(res),
      error =>    this._handleError(error)
    );
  }


  private createForm()
   {
    this.statusForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      color: ['', [Validators.required]]
    });
   }

	private _handleUpdateSuccess(data: any)
  {
    this.errors = null;

    this.snackBar.open("Creado correctamente", "OK", {
      duration: 2000,
    });

    this._router.navigate(['/statuses/list']);


  }

  openColorPickerDialog(): void {
    let dialogRef = this.dialog.open(ColorPickerComponent, {
      width: '618px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.color = result;
    });
  }


  private _handleError(error: any) {
      this.snackBar.open(error.json()['rut'], null, {
        duration: 2000,
      });
  }

  private _handleTokenError(error: any) {
    var config: MatSnackBarConfig = new MatSnackBarConfig();
    config.duration = 1000;
    this.snackBar.open("Su sesión ha expirado.", undefined, config);
    this._router.navigate(['/signin']);
  }
}
