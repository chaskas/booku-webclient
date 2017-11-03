import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { DateAdapter, NativeDateAdapter } from '@angular/material';

import { BookingService } from '../../../services/booking.service';
import { PaymentService } from '../../../services/payment.service';

import { PaymentNewComponent } from '../../payment/payment-new/payment-new.component';

import { Booking } from '../../../model/booking';

import { PaymentsDatabase } from './payments-database';
import { PaymentDataSource } from './payment-datasource';

import * as moment from 'moment';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { Angular2TokenService } from 'angular2-token';

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

  displayedColumns = ['date','bill','method', 'amount'];
  paymentDataSource: PaymentDataSource | null;

  methods: Array<String> = [ "Transferencia", "Efectivo", "WebPay", "Cheque" ];

  constructor(
    private bookingService: BookingService,
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    private router: Router,
    dateAdapter: DateAdapter<NativeDateAdapter>,
    public paymentDatabase: PaymentsDatabase,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private _tokenService: Angular2TokenService,
    private _router: Router
  ) {
    dateAdapter.setLocale('es-CL');
    moment.locale('es');
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
    this.calculateDates();

  }

  openPaymentNewDialog(): void {
    let dialogRef = this.dialog.open(PaymentNewComponent, {
      data: { booking: this.booking }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  calculateDates(){

    this.nights = moment(this.booking.departure).startOf('day').diff(moment(this.booking.arrival).startOf('day'), 'days');
    this.days = moment(this.booking.departure).startOf('day').diff(moment(this.booking.arrival).startOf('day'), 'days') + 1;

    this.minDate = moment(this.booking.arrival).startOf('day').format();
    this.maxDate = moment(this.booking.departure).startOf('day').format();

  }

   private _handleTokenError(error: any) {
    var config: MatSnackBarConfig = new MatSnackBarConfig();
    config.duration = 1000;
    this.snackBar.open("Su sesión ha expirado.", undefined, config);
    this._router.navigate(['/signin']);
  }

}
