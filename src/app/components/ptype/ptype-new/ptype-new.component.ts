import { Component, OnInit, Input } from '@angular/core';

import { PTypeService } from '../../../services/ptype.service';
import { PType } from '../../../model/ptype';

import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { CustomValidators } from 'ng2-validation';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-ptype-new',
  templateUrl: './ptype-new.component.html',
  styleUrls: ['./ptype-new.component.css']
})
export class PtypeNewComponent implements OnInit {

  ptype: PType;
  ptypeForm: FormGroup;
  @Input() errors: string[];
  @Input() success: string;

  constructor(

  	private ptypeService: PTypeService,
  	private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private _router: Router,
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

  createPType()
  {
    this.ptypeService.createPType(this.ptypeForm.value).then(
      res =>      this._handleUpdateSuccess(res),
      error =>    this._handleError(error)
    );
  }

   private createForm()
   {
    this.ptypeForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      plural: ['', [Validators.required]],
      schedule_type: ['', [Validators.required]]
    });
   }

	private _handleUpdateSuccess(data: any)
  {
	   this.errors = null;
	   this.snackBar.open("Creado correctamente", "OK", {
	     duration: 2000,
	   });
     this._router.navigate(['/ptypes']);

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
