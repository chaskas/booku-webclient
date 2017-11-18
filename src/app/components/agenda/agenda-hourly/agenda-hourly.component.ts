import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';


import { PTypeService } from '../../../services/ptype.service';
import { PlaceService } from '../../../services/place.service';
import { BookingService } from '../../../services/booking.service';

import { PType } from '../../../model/ptype';
import { Place } from '../../../model/place';
import { Booking } from '../../../model/booking';
import { Matrix } from '../../../model/matrix';

import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

import { MatDatepicker } from '@angular/material';
import { Moment } from 'moment';
import * as moment from 'moment';

import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-agenda-hourly',
  templateUrl: './agenda-hourly.component.html',
  styleUrls: ['./agenda-hourly.component.css']
})
export class AgendaHourlyComponent implements OnInit {

  days: Array<Date>;

  matrix: Matrix[];

  ptype: PType;

  places: Place[];

  nHours: number;
  ptype_id: number;

  @ViewChild(MatDatepicker) date_picker: MatDatepicker<Moment>;

  starts: string;
  ends: string;

  constructor(
    private route: ActivatedRoute,
    private ptypeService: PTypeService,
    private placeService: PlaceService,
    private bookingService: BookingService,
    public snackBar: MatSnackBar,
    private _tokenService: Angular2TokenService,
    private _router: Router
  ) {
    moment.locale('es');

  }

  ngOnInit()
  {
    this._tokenService.validateToken().subscribe(
      res =>      console.log("Token Valid!"),
      error =>    this._handleTokenError(error)
    );

    this.route.params.subscribe(params => {
      if(!params['ptype']){
        this.ptype_id = 1;
      } else {
        this.ptype_id = +params['ptype'];
      }

      this.ptypeService.getPType(this.ptype_id).then(ptype => this.handleGetPTypeSuccess(ptype));

    });

  }

  private handleGetPTypeSuccess(ptype: PType)
  {
    this.ptype = ptype;

    this.starts = moment({ year: moment().year(), month: moment().month(), date: moment().date(), hour: moment(this.ptype.opening).hour(), minute: moment(this.ptype.opening).minute()}).format();
    this.ends = moment({ year: moment().year(), month: moment().month(), date: moment().date(), hour: moment(this.ptype.closing).hour(), minute: moment(this.ptype.closing).minute()}).format();

    this.placeService.getPlacesByPType(ptype.id).then(places => this.handleGetPlacesSuccess(places));
  }

  private calculateDates()
  {

    this.starts = moment({ year: moment(this.starts).year(), month: moment(this.starts).month(), date: moment(this.starts).date(), hour: moment(this.ptype.opening).hour(), minute: moment(this.ptype.opening).minute()}).format();
    this.ends = moment({ year: moment(this.starts).year(), month: moment(this.starts).month(), date: moment(this.starts).date(), hour: moment(this.ptype.closing).hour(), minute: moment(this.ptype.closing).minute()}).format();

    this.days = new Array<Date>();

    this.nHours =  moment(this.ends).diff(moment(this.starts), 'hours') + 1;

    this.bookingService.getBookingsByDayAndPlace(moment(this.starts).toDate(), this.nHours, this.ptype_id).then(response => this.handleGetMatrixSuccess(response));

    var i = 0;
    for(i = 0; i < this.nHours; i++)
    {
      var day = moment(this.starts).add(i, 'hours').toDate();
      this.days.push(day);
    }
  }

  private handleGetPlacesSuccess(places: Place[])
  {
    this.places = places;

    this.calculateDates();

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
