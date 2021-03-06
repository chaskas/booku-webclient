import { Component, OnInit, Input } from '@angular/core';

import { PlaceService } from '../../../services/place.service';
import { PTypeService } from '../../../services/ptype.service';
import { PType } from '../../../model/ptype';
import { Place } from '../../../model/place';


import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { CustomValidators } from 'ng2-validation';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-place-new',
  templateUrl: './place-new.component.html',
  styleUrls: ['./place-new.component.css']
})
export class PlaceNewComponent implements OnInit {

	place: Place;
	placeForm: FormGroup;
  ptypes: PType[];
	@Input() errors: string[];
	@Input() success: string;

  constructor(
  	private placeService: PlaceService,
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
    this.ptypeService.getPTypes().then(
       ptypes => this.ptypes = ptypes,
       errors => this._handleError(errors)
      )
  }

  createPlace()
  {
    this.placeService.createPlace(this.placeForm.value).then(
      res =>      this._handleUpdateSuccess(res),
      error =>    this._handleError(error)
    );
  }

	private createForm()
	{
    this.placeForm = this.formBuilder.group({
      capacity: ['', [Validators.required]],
      price: ['', [Validators.required]],
      name: ['', [Validators.required]],
      ptype_id: ['', [Validators.required]],
      extra_night: [''],
      extra_passenger: [''],
      dsep: ['']
    });
	}

  private _handleUpdateSuccess(data: any) {
     this.errors = null;
     this.snackBar.open("Creado correctamente", "OK", {
       duration: 2000,
     });
     this._router.navigate(['/places']);
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
