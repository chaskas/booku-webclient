import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { BookingService } from '../../../services/booking.service';
import { PaymentService } from '../../../services/payment.service';

import { BookingEditComponent } from '../../booking/booking-edit/booking-edit.component';
import { PaymentNewComponent } from '../../payment/payment-new/payment-new.component';

import { Booking } from '../../../model/booking';

import { PaymentsDatabase } from './payments-database';
import { PaymentDataSource } from './payment-datasource';

import * as moment from 'moment';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { Angular2TokenService } from 'angular2-token';

import { AppConfig } from '../../../config/app-config';

@Component({
  selector: 'app-booking-show',
  templateUrl: './booking-show.component.html',
  styleUrls: ['./booking-show.component.css']
})
export class BookingShowComponent implements OnInit {

  booking: Booking;

  minDate: string;
  maxDate: string;

  days: number;
  nights: number;

  arrival: string;
  departure: string;

  displayedColumns = ['date','bill','method', 'amount'];
  paymentDataSource: PaymentDataSource | null;

  methods: Array<String> = [ "Transferencia", "Efectivo", "WebPay", "Cheque" ];

  download_url: string;

  constructor(
    private bookingService: BookingService,
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    private router: Router,
    public paymentDatabase: PaymentsDatabase,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private _tokenService: Angular2TokenService,
    private _router: Router,
    private config: AppConfig
  ) {
    moment.locale('es-CL');
  }

  ngOnInit() {
     this._tokenService.validateToken().subscribe(
      res =>      console.log("Token Valid!"),
      error =>    this._handleTokenError(error)
    );

    this.route.params
    	.switchMap((params: Params) => this.bookingService.getBooking(+params['id']))
    	.subscribe(booking => this.handleGetBookingSuccess(booking));

    this.paymentDatabase = new PaymentsDatabase(this.route, this.paymentService);
    this.paymentDataSource = new PaymentDataSource(this.paymentDatabase);

  }

  private handleGetBookingSuccess(booking: Booking){

    this.booking = booking;

    this.download_url = this.config.get('host') + "/bookings/" + this.booking.id + ".pdf";

    this.arrival = moment(this.booking.arrival).format('dddd DD/MM/YY HH:mm');
    this.departure = moment(this.booking.departure).format('dddd DD/MM/YY HH:mm');

    this.calculateDates();

  }

  openBookingEditDialog(): void {
    let dialogRef = this.dialog.open(BookingEditComponent, {
      data: { booking: this.booking }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  openPaymentNewDialog(): void {
    let dialogRef = this.dialog.open(PaymentNewComponent, {
      data: { booking: this.booking }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  private calculateDates(){

    this.nights = moment(this.booking.departure).startOf('day').diff(moment(this.booking.arrival).startOf('day'), 'days');
    this.days = moment(this.booking.departure).startOf('day').diff(moment(this.booking.arrival).startOf('day'), 'days') + 1;

  }

   private _handleTokenError(error: any) {
    var config: MatSnackBarConfig = new MatSnackBarConfig();
    config.duration = 1000;
    this.snackBar.open("Su sesión ha expirado.", undefined, config);
    this._router.navigate(['/signin']);
  }

}