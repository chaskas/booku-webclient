import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';


import { PlaceService } from '../../../services/place.service';
import { BookingService } from '../../../services/booking.service';

import { Place } from '../../../model/place';
import { Booking } from '../../../model/booking';
import { Matrix } from '../../../model/matrix';

import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

import { MatDatepicker } from '@angular/material';
import { Moment } from 'moment';
import * as moment from 'moment';

import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-agenda-daily',
  templateUrl: './agenda-daily.component.html',
  styleUrls: ['./agenda-daily.component.css']
})
export class AgendaDailyComponent implements OnInit {

  days: Array<Date>;

  matrix: Matrix[];

  places: Place[];

  nDays: number;
  ptype: number;

  @ViewChild(MatDatepicker) starts_picker: MatDatepicker<Moment>;
  @ViewChild(MatDatepicker) ends_picker: MatDatepicker<Moment>;

  starts: string;
  ends: string;

  minDate: string;
  maxDate: string;

  constructor(
    private route: ActivatedRoute,
    private placeService: PlaceService,
    private bookingService: BookingService,
    public snackBar: MatSnackBar,
    private _tokenService: Angular2TokenService,
    private _router: Router
  ) {
    moment.locale('es');

    this.starts = moment().format();
    this.ends = moment().add(30, 'days').format();
  }

  ngOnInit()
  {
    this._tokenService.validateToken().subscribe(
      res =>      console.log("Token Valid!"),
      error =>    this._handleTokenError(error)
    );

    this.route.params
      .switchMap((params: Params) => this.placeService.getPlacesByPType(+params['ptype']))
      .subscribe(places => this.handleGetPlacesSuccess(places));

    this.route.params.subscribe(params => {
      if(!params['ptype'])
        this.ptype = 1;
      else
        this.ptype = +params['ptype'];
    });

    this.calculateDates();

  }

  private calculateDates()
  {
    this.days = new Array<Date>();

    this.minDate = moment(this.starts).startOf('day').format();
    this.maxDate = moment(this.ends).endOf('day').format();

    this.nDays =  moment(this.ends).startOf('day').diff(moment(this.starts).startOf('day'), 'days') + 1;

    this.bookingService.getBookingsByDayAndPlace(moment(this.starts).endOf("day").toDate(), this.nDays, this.ptype).then(response => this.handleGetMatrixSuccess(response));

    var i = 0;
    for(i = 0; i < this.nDays; i++)
    {
      var day = moment(this.starts).add(i, 'days').endOf("day").toDate();
      this.days.push(day);
    }
  }

  private handleGetPlacesSuccess(places: Place[])
  {
    this.places = places;
  }

  private handleGetMatrixSuccess(matrix: Matrix[])
  {
    this.matrix = Array.from(matrix);
  }

  private _handleTokenError(error: any)
  {
    var config: MatSnackBarConfig = new MatSnackBarConfig();
    config.duration = 1000;
    this.snackBar.open("Su sesión ha expirado.", undefined, config);
    this._router.navigate(['/signin']);
  }
}
