import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';


import { PlaceService } from '../../../services/place.service';
import { BookingService } from '../../../services/booking.service';

import { Place } from '../../../model/place';
import { Booking } from '../../../model/booking';
import { Matrix } from '../../../model/matrix';

import * as moment from 'moment';

import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-agenda-monthly',
  templateUrl: './agenda-monthly.component.html',
  styleUrls: ['./agenda-monthly.component.css']
})
export class AgendaMonthlyComponent implements OnInit {

  days: Array<Date>;

  matrix: Matrix[];

  places: Place[];

  nDays: number;
  ptype: number;

  constructor(
    private route: ActivatedRoute,
    private placeService: PlaceService,
    private bookingService: BookingService,
    public snackBar: MatSnackBar,
    private _tokenService: Angular2TokenService,
    private _router: Router
  ) {
    moment.locale('es');
  }

  ngOnInit() {
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

    this.days = new Array<Date>();

    this.nDays = 31;

    this.bookingService.getBookingsByDayAndPlace(moment().add(0, 'days').endOf("day").toDate(), this.nDays, this.ptype).then(response => this.handleGetMatrixSuccess(response));

    var i = 0;
    for(i = 0; i < this.nDays; i++)
    {

      var day = moment().add(i, 'days').endOf("day").toDate();
      this.days.push(day);
    }

  }

  private handleGetPlacesSuccess(places: Place[]){
    this.places = places;
  }

  private handleGetMatrixSuccess(matrix: Matrix[]){

    this.matrix = Array.from(matrix);

  }
   private _handleTokenError(error: any) {
    var config: MatSnackBarConfig = new MatSnackBarConfig();
    config.duration = 1000;
    this.snackBar.open("Su sesión ha expirado.", undefined, config);
    this._router.navigate(['/signin']);
  }
}
