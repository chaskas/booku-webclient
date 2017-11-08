import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

import { PlaceService } from '../../../services/place.service';
import { Place } from '../../../model/place';
import { PTypeService } from '../../../services/ptype.service';
import { PType } from '../../../model/ptype';
import { DialogsServiceService } from '../../../services/dialogs-service.service';

import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { Router } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-place-edit',
  templateUrl: './place-edit.component.html',
  styleUrls: ['./place-edit.component.css']
})
export class PlaceEditComponent implements OnInit {

  place: Place;
  placeForm: FormGroup;
  ptypes: PType[];
  @Input() errors: string[];
  @Input() success: string;

  constructor(
  	  private placeService: PlaceService,
      private dialogsService: DialogsServiceService,
      private ptypeService: PTypeService,
	    private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      public snackBar: MatSnackBar,
      private _router: Router,
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
      .switchMap((params: Params) => this.placeService.getPlace(+params['id']))
      .subscribe(place => this._handleGetPlaceSuccess(place));

      this.ptypeService.getPTypes().then(
        ptypes => this.ptypes = ptypes,
        errors => this._handleError(errors)
      );
  }
  public openDialog() {
    this.dialogsService
      .confirm('Confirmar', '¿Seguro que quiere eliminar?')
      .subscribe(res => this.deletePlace(res));
  }


	private createForm()
	{
    this.placeForm = this.formBuilder.group({
      capacity: ['', [Validators.required]],
      price: ['', [Validators.required]],
      opening: ['', [Validators.required]],
      closing: ['', [Validators.required]],
      name: ['', [Validators.required]],
      ptype_id: ['', [Validators.required]],
      extra_night: [''],
      extra_passenger: [''],
      dsep: ['']
    });
	}

  private _handleGetPlaceSuccess(place: Place)
  {
    this.place = place;

    this.placeForm.setValue({
      capacity: place.capacity,
      price: place.price,
      opening: new Date(place.opening).toTimeString().split(' ')[0],
      closing: new Date(place.closing).toTimeString().split(' ')[0],
      name: place.name,
      ptype_id: place.ptype_id,
      extra_night: place.extra_night,
      extra_passenger: place.extra_passenger,
      dsep: place.dsep
    });
  }

  updatePlace()
  {
  	this.placeService.updatePlace(this.place.id, this.placeForm.value).then(
  		res => this._handleUpdateSuccess(res),
  		error => this._handleError(error)
  	);
  }

  deletePlace(res: boolean): void
  {
    if(res) {
      this.placeService.deletePlace(this.place.id).then((data) => {
        this._router.navigate(['places']);
      });
    }
  }

   private _handleUpdateSuccess(data: any) {
    this.errors = null;
    this.snackBar.open("Actualizado correctamente", undefined, {
      duration: 2000,
    });
    this._router.navigate(['/places']);
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
