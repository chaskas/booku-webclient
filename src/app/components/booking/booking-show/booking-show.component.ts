import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';

import { DateAdapter, NativeDateAdapter } from '@angular/material';

import { BookingService } from '../../../services/booking.service';
import { PaymentService } from '../../../services/payment.service';

import { Booking } from '../../../model/booking';

import { PaymentsDatabase } from './payments-database';
import { PaymentDataSource } from './payment-datasource';

import * as moment from 'moment';


@Component({
  selector: 'app-booking-show',
  templateUrl: './booking-show.component.html',
  styleUrls: ['./booking-show.component.css']
})
export class BookingShowComponent implements OnInit {

  booking: Booking;

  days: number;
  nights: number;

  displayedColumns = ['date','bill','method', 'amount'];
  paymentDataSource: PaymentDataSource | null;

  constructor(
    private bookingService: BookingService,
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    private router: Router,
    dateAdapter: DateAdapter<NativeDateAdapter>,
    public paymentDatabase: PaymentsDatabase
  ) {
    dateAdapter.setLocale('es-CL');
    moment.locale('es');
  }

  ngOnInit() {
    this.route.params
    	.switchMap((params: Params) => this.bookingService.getBooking(+params['id']))
    	.subscribe(booking => this.handleGetBookingSuccess(booking));

    this.paymentDatabase = new PaymentsDatabase(this.route, this.paymentService);
    this.paymentDataSource = new PaymentDataSource(this.paymentDatabase);

  }

  private handleGetBookingSuccess(booking: Booking){
    this.booking = booking;

    this.nights = moment(booking.departure).startOf('day').diff(moment(booking.arrival).startOf('day'), 'days');
    this.days = moment(booking.departure).startOf('day').diff(moment(booking.arrival).startOf('day'), 'days') + 1;

    // console.log("dias:" + this.days);
  }

}
