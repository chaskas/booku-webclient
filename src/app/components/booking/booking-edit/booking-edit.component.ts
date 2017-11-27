import { Component, OnInit, Inject, Input, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatDialogRef, MatSnackBarConfig } from '@angular/material';

import { BookingService } from '../../../services/booking.service';
import { PlaceService } from '../../../services/place.service';
import { StatusService } from '../../../services/status.service';

import { DialogsServiceService } from '../../../services/dialogs-service.service';

import { Booking } from '../../../model/booking';
import { PType } from '../../../model/ptype';
import { Place } from '../../../model/place';
import { Status } from '../../../model/status';

import { MatDatepicker } from '@angular/material';
import { Moment } from 'moment';
import * as moment from 'moment';

@Component({
  selector: 'app-booking-edit',
  templateUrl: './booking-edit.component.html',
  styleUrls: ['./booking-edit.component.css']
})
export class BookingEditComponent implements OnInit {

  @ViewChild(MatDatepicker) arrival: MatDatepicker<Moment>;
  @ViewChild(MatDatepicker) departure: MatDatepicker<Moment>;

  booking: Booking;
  bookingForm: FormGroup;
  @Input() errors: string[];
  @Input() success: string;

  minDate: string;
  maxDate: string;

  days: number;
  nights: number;

  arrival_time: string;
  departure_time: string;

  place: Place;
  places: Place[];
  statuses: Status[];

  constructor(
    public dialogRef: MatDialogRef<BookingEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public snackBar: MatSnackBar,
    private bookingService: BookingService,
    private statusService: StatusService,
    private placeService: PlaceService,
    private router: Router,
    private formBuilder: FormBuilder,
    private dialogsService: DialogsServiceService
  ) {
    moment.locale('es');

    this.data.booking.arrival = moment(this.data.booking.arrival);
    this.data.booking.departure = moment(this.data.booking.departure);

    this.createForm();
    this.arrival_time   = moment(this.data.booking.arrival).format('HH:mm');
    this.departure_time = moment(this.data.booking.departure).format('HH:mm');
  }

  ngOnInit() {
    this.calculateDates();
    this.placeService.getPlacesByPType(this.data.booking.place.ptype_id).then(places => this.places = places);
    this.statusService.getStatuses().then(statuses => this.statuses = statuses);
  }

  private createForm()
  {
    this.bookingForm = this.formBuilder.group({
      arrival: [this.data.booking.arrival, [Validators.required]],
      departure: [this.data.booking.departure, [Validators.required]],
      subtotal: [this.data.booking.subtotal, [Validators.required]],
      total: [this.data.booking.total, [Validators.required]],
      discount: [this.data.booking.discount, [Validators.required]],
      status_ids: [this.data.booking.status_ids],
      adults: [this.data.booking.adults, [Validators.required]],
      childrens: [this.data.booking.childrens, [Validators.required]],
      notes: [this.data.booking.notes],
      client_id: [this.data.booking.client_id, [Validators.required]],
      place_id: [this.data.booking.place_id, [Validators.required]]
    });
  }

  updateBooking()
  {
    this.bookingService.updateBooking(this.data.booking.id, this.bookingForm.value).then(
      res =>      this.handleEditSuccess(res),
      error =>    this.handleError(error)
    );
  }

  private handleEditSuccess(data: any) {
    this.errors = null;
    this.snackBar.open("Reserva actualizada correctamente", "OK", {
      duration: 2000,
    });

    this.dialogRef.close();

  }

  private handleError(error: any) {
      this.snackBar.open(error.json(), null, {
        duration: 2000,
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private calculateDates(){

    this.nights = moment(this.data.booking.departure).startOf('day').diff(moment(this.data.booking.arrival).startOf('day'), 'days');
    this.days = this.nights + 1;

    this.minDate = moment(this.data.booking.arrival).startOf('day').format();
    this.maxDate = moment(this.data.booking.departure).endOf('day').format();

    this.updateTimes();

    this.calculateSubtotal();

  }

  private calculateSubtotal(){

    var extra_nights: number = 0;
    var extra_passengers: number = 0;
    var extra_dsep: number = 0;

    if(this.nights > 1){
      extra_nights = Number(this.data.booking.place.extra_night) * (this.nights - 1);
    }

    if((Number(this.data.booking.adults) + Number(this.data.booking.childrens)) > Number(this.data.booking.place.capacity)){
      extra_passengers = Number(this.data.booking.place.extra_passenger);
    }

    if(this.data.booking.status_ids.find(x => x == 2)){
      extra_dsep = Number(this.data.booking.place.dsep);
    }

    this.data.booking.subtotal = this.data.booking.place.price + extra_nights + extra_passengers + extra_dsep;

    this.calculateTotal();

  }

  private calculateTotal(){
    this.data.booking.total = Number(this.data.booking.subtotal) - Number(this.data.booking.subtotal) * Number(this.data.booking.discount)/100;
  }

  private changePlace(){
    this.placeService.getPlace(this.data.booking.place_id).then(place => this.changePlaceSuccess(place));
  }

  private changePlaceSuccess(place: Place){
    this.data.booking.place = place;
    this.calculateSubtotal();
  }

  private updateTimes() {

    var arrival_date = moment(this.data.booking.arrival);
    var departure_date = moment(this.data.booking.departure);

    this.data.booking.arrival =   moment(arrival_date.format('YYYY')   + "-" +   arrival_date.format('MM') + "-" +   arrival_date.format('DD') + "T" + this.arrival_time   + ":00.000-03:00");
    this.data.booking.departure = moment(departure_date.format('YYYY') + "-" + departure_date.format('MM') + "-" + departure_date.format('DD') + "T" + this.departure_time + ":00.000-03:00");

  }

  public openDestroyDialog(id: number, ptype: PType) {
    this.dialogsService
      .confirm('Confirmar', '¿Seguro que quiere eliminar?')
      .subscribe(res => this.destroyBooking(res, id, ptype));
  }

  destroyBooking(res: boolean, id: number, ptype: PType): void
  {
    if(res) {

      let sts: Array<String> = ['daily', 'hourly'];

      this.bookingService.deleteBooking(id).then((data) => {
        this.router.navigate(['/agenda/'+ sts[ptype.schedule_type] + '/' + ptype.id]);
        this.dialogRef.close();
      });
    }
  }

}
