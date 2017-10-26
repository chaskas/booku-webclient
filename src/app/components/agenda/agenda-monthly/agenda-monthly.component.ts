import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';


import { PlaceService } from '../../../services/place.service';
import { BookingService } from '../../../services/booking.service';

import { Place } from '../../../model/place';
import { Booking } from '../../../model/booking';
import { Matrix } from '../../../model/matrix';

import * as moment from 'moment';

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
    private bookingService: BookingService
  ) {
    moment.locale('es');
  }

  ngOnInit() {

    this.route.params
      .switchMap((params: Params) => this.placeService.getPlacesByPType(+params['ptype']))
      .subscribe(places => this.handleGetPlacesSuccess(places));

    this.route.params.subscribe(params => {
       this.ptype = +params['ptype'];
    });

    this.days = new Array<Date>();

    this.nDays = 10;

    this.bookingService.getBookingsByDayAndPlace(moment().add(0, 'days').endOf("day").toDate(), this.nDays, this.ptype).then(response => this.handleGetMatrixSuccess(response));

    var i = 0;
    for(i = 0; i < this.nDays; i++){

      var day = moment().add(i, 'days').endOf("day").toDate();
      // console.log(day);
      this.days.push(day);

    }

  }

  private handleGetPlacesSuccess(places: Place[]){
    this.places = places;
  }

  private handleGetMatrixSuccess(matrix: Matrix[]){

    this.matrix = Array.from(matrix);

  }

}
