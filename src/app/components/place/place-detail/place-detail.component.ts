import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/switchMap';

import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

import { Place } from '../../../model/place';

import { PlaceService } from '../../../services/place.service';
import { Angular2TokenService } from 'angular2-token';
@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.css']
})
export class PlaceDetailComponent implements OnInit {

	place: Place;

  constructor(
  	private placeService: PlaceService,
  	private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private _router: Router,
    private _tokenService: Angular2TokenService    

  	) {
    this._tokenService.validateToken().subscribe(
      res =>      console.log("Token Valid!"),
      error =>    this._handleTokenError(error)
    );

	this.route.params
	.switchMap((params: Params) => this.placeService.getPlace(+params['id']))
	.subscribe(place => this._handleGetPlaceSuccess(place));
    } 

  ngOnInit() {
  }
  private _handleGetPlaceSuccess(place: Place)
   {
    this.place = place;
	}

  private _handleTokenError(error: any) {
    var config: MatSnackBarConfig = new MatSnackBarConfig();
    config.duration = 1000;
    this.snackBar.open("Su sesión ha expirado.", undefined, config);
    this._router.navigate(['/signin']);
  }
}
