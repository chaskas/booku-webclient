import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import 'rxjs/add/operator/switchMap';

import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

import { Place } from '../../../model/place';

import { PlaceService } from '../../../services/place.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.css']
})
export class PlaceDetailComponent implements OnInit {

	place: Place;

  constructor(
  	private placeService: PlaceService,
  	private route: ActivatedRoute

  	) {

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
}
