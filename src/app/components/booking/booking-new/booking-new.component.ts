import { Component, OnInit, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { MatStepperModule } from '@angular/material';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { MatDatepicker } from '@angular/material';

import { Moment } from 'moment';
import * as moment from 'moment';

import { CustomValidators } from 'ng2-validation';
import { RutValidator } from '../../../utils/rut/ng2-rut.module';

import { rutClean } from 'rut-helpers';

import { ClientService } from '../../../services/client.service';
import { BookingService } from '../../../services/booking.service';
import { PlaceService } from '../../../services/place.service';
import { StatusService } from '../../../services/status.service';
import { Angular2TokenService } from 'angular2-token';

import { Client } from '../../../model/client';
import { Booking } from '../../../model/booking';
import { Status } from '../../../model/status';
import { Place } from '../../../model/place';
import { PType } from '../../../model/ptype';

@Component({
  selector: 'app-booking-new',
  templateUrl: './booking-new.component.html',
  styleUrls: ['./booking-new.component.css']
})
export class BookingNewComponent implements OnInit {

  isLinear = false;

  bookingForm: FormGroup;
  clientForm: FormGroup;

  newClient = 1;
  client_id: number;
  place_id: number;
  date: Date;

  arrival_str: string;
  departure_str: string;

  arrival_time: string;
  departure_time: string;

  minDate: string;
  maxDate: string;

  days: number;
  nights: number;

  clients: Client[];
  client: Client;
  place: Place;
  places: Place[];
  statuses: Status[];
  status_ids: Array<number>;
  bookingStatuses: Status[];

  adults: number = 0;
  childrens: number = 0;

  total: number = 0;
  subtotal: number = 0;
  discount: number = 0;

  @Input() errors: string[];
  @Input() success: string;

  @ViewChild(MatDatepicker) arrival: MatDatepicker<Moment>;
  @ViewChild(MatDatepicker) departure: MatDatepicker<Moment>;

  clientAutoControl = new FormControl();
  filteredClients: Observable<Client[]>;

  constructor(
    private rv: RutValidator,
    public snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private clientService: ClientService,
    private bookingService: BookingService,
    private statusService: StatusService,
    private placeService: PlaceService,
  	private formBuilder: FormBuilder,
    private _router: Router,
    private _tokenService: Angular2TokenService,
    private cdRef: ChangeDetectorRef

  ) {

    moment.locale('es-CL');

    this.place = new Place();
    this.status_ids = new Array<number>();

    this._tokenService.validateToken().subscribe(
      res =>      console.log("Token Valid!"),
      error =>    this._handleTokenError(error)
    );

    this.statusService.getStatuses().then(statuses => this.statuses = statuses);

  }

  filter(rut: string): Client[]
  {

    if(typeof this.clientAutoControl.value === 'object'){

      this.client_id = this.clientAutoControl.value.id;
      this.bookingForm.patchValue({ 'client_id': this.client_id });
      this.newClient = 1;

    }

    return this.clients.filter(client =>
      client.rut.toLowerCase().indexOf(rut.toLowerCase()) === 0);

  }

  displayFn(client: Client): string
  {
    return client ? client.rut + " " + client.first_name + " " + client.last_name : null;
  }

  ngOnInit()
  {

    this.route.queryParams.subscribe(params => this.handleParams(params));

    this.placeService.getPlaces().then(places => this.places = places);

    this.createBookingForm();
    this.createClientForm();

    this.clientService.getClients().then(clients => this.handleGetClientsSuccess(clients));

  }

  private handleGetClientsSuccess(clients: Client[])
  {
    this.clients = clients;

    this.filteredClients = this.clientAutoControl.valueChanges
      .startWith(null)
      .map(client => client && typeof client === 'object' ? client.rut : client)
      .map(rut => rut ? this.filter(rut) : this.clients.slice());
  }

  handleParams(params: Params)
  {
    this.place_id = +params['p'];
    this.arrival_str = moment.unix(params['d']).format("YYYY-MM-DDTHH:mm:ss.000-03:00");

    this.placeService.getPlace(this.place_id).then(place => this.handleGetPlaceSuccess(place));

  }

  handleGetPlaceSuccess(place: Place)
  {
    this.place = place;

    if(this.place.ptype.schedule_type == 1){

      this.departure_str = moment(this.arrival_str).add(1,'hours').format("YYYY-MM-DDTHH:mm:ss.000-03:00");

      this.arrival_time   = moment(this.arrival_str).format('HH:mm');
      this.departure_time   = moment(this.departure_str).format('HH:mm');


    } else {

      this.departure_str = moment(this.arrival_str).startOf('day').add(1, 'days').format("YYYY-MM-DDTHH:mm:ss.000-03:00");

      this.arrival_time   = moment("15:00", "HH:mm").format('HH:mm');
      this.departure_time   = moment("11:00", "HH:mm").format('HH:mm');

    }

    this.calculateDates();

    this.placeService.getPlacesByPType(place.ptype.id).then(places => this.places = places);
  }

  createClient()
  {
    this.clientService.createClient(this.clientForm.value).then(
      res =>      this._handleUpdateSuccess(res),
      error =>    this._handleError(error)
    );
  }

  private getClient()
  {
    this.route.params
    .switchMap((params: Params) => this.clientService.getClient(this.client_id))
    .subscribe(client => this._handleGetClientSuccess(client));
  }

  private _handleUpdateSuccess(data: Client)
  {

    this.clientService.getClients().then(clients => this.handleCreateClientSuccess(clients));

    this.client_id = data.id;

    this.client = data;

    this.clientAutoControl.setValue(this.client);

    this.errors = null;

  }

  private handleCreateClientSuccess(clients: Client[])
  {

    this.clients = clients;

    this.newClient = 1;

    this.snackBar.open("Cliente Registrado correctamente", "OK", {
     duration: 2000,
    });

  }

  private _handleError(error: any)
  {
      this.snackBar.open(error.json(), null, {
        duration: 2000,
      });
  }

  private _handleGetClientSuccess(client: Client)
  {
    this.client = client;

    var rut = rutClean(client.rut);
    var rutDigits = parseInt(rut, 10);
    var m = 0;
    var s = 1;
    while (rutDigits > 0) {
        s = (s + rutDigits % 10 * (9 - m++ % 6)) % 11;
        rutDigits = Math.floor(rutDigits / 10);
    }
    var checkDigit = (s > 0) ? String((s - 1)) : 'K';

    client.rut = client.rut + "-" + checkDigit;

    this.bookingForm.patchValue({ 'client_id': this.client.id});

  }

  private _handleTokenError(error: any)
  {
    var config: MatSnackBarConfig = new MatSnackBarConfig();
    config.duration = 1000;
    this.snackBar.open("Su sesión ha expirado.", undefined, config);
    this._router.navigate(['/signin']);
  }

  private calculateDates()
  {

    this.minDate = moment(this.arrival_str).startOf('day').format();
    this.maxDate = moment(this.departure_str).endOf('day').format();

    this.updateTimes();

    this.calculateSubtotal();

  }

  private updateTimes()
  {

    var arrival_date = moment(this.arrival_str);
    var departure_date = moment(this.departure_str);

    this.arrival_str =   arrival_date.format('YYYY')   + "-" +   arrival_date.format('MM') + "-" +   arrival_date.format('DD') + "T" + this.arrival_time   + ":00.000-03:00";
    this.departure_str = departure_date.format('YYYY') + "-" + departure_date.format('MM') + "-" + departure_date.format('DD') + "T" + this.departure_time + ":00.000-03:00";

    if(this.place.ptype.schedule_type == 1)
    {
      this.nights = moment(this.departure_str).diff(moment(this.arrival_str), 'hours');
    } else {
      this.nights = moment(this.departure_str).startOf('day').diff(moment(this.arrival_str).startOf('day'), 'days');
    }

    this.days = this.nights + 1;

  }

  private changePlace()
  {
    this.placeService.getPlace(this.place_id).then(place => this.changePlaceSuccess(place));
  }

  private changePlaceSuccess(place: Place)
  {
    this.place = place;
    this.calculateSubtotal();
  }

  private calculateSubtotal()
  {

    var extra_nights: number = 0;
    var extra_passengers: number = 0;
    var extra_dsep: number = 0;

    if(this.nights > 1){
      if(this.place.ptype.schedule_type == 1)
      {
        extra_nights = Number(this.place.price) * Number(this.nights -1);
      } else {
        extra_nights = Number(this.place.extra_night) * Number(this.nights - 1);
      }
    }

    if((Number(this.adults) + Number(this.childrens)) > Number(this.place.capacity)){
      extra_passengers = Number(this.place.extra_passenger);
    }

    if(this.status_ids.find(x => x == 2)){
      extra_dsep = Number(this.place.dsep);
      if(this.place.ptype && this.place.ptype.schedule_type == 0)this.departure_time = moment("19:00", "HH:mm").format('HH:mm');
    } else {
      if(this.place.ptype && this.place.ptype.schedule_type == 0)this.departure_time = moment("11:00", "HH:mm").format('HH:mm');
    }

    this.subtotal = this.place.price + extra_nights + extra_passengers + extra_dsep;

    this.calculateTotal();

  }

  ngAfterViewChecked()
  {
    this.cdRef.detectChanges();
  }

  private calculateTotal()
  {
    this.total = Number(this.subtotal) - Number(this.subtotal) * Number(this.discount)/100;
  }

  private createBooking()
  {
    this.bookingService.createBooking(this.bookingForm.value).then(
      booking => this.handleCreateBookingSuccess(booking),
      error =>    this._handleError(error)
    );
  }

  private handleCreateBookingSuccess(booking: Booking)
  {
    this.snackBar.open("Reserva creada correctamente", "OK", {
     duration: 2000,
    });
    this._router.navigate(['/booking/', booking.id]);
  }

  private getStatuses()
  {
    this.statusService.getStatusesByIds(this.status_ids).then(
      statuses => this.handlegetStatusesSuccess(statuses),
      error =>    this._handleError(error)
    );
  }

  private handlegetStatusesSuccess(statuses: Status[])
  {
    this.bookingStatuses = statuses;
  }

  private createBookingForm()
  {
    this.bookingForm = this.formBuilder.group({
      arrival: ['', [Validators.required]],
      departure: ['', [Validators.required]],
      subtotal: ['', [Validators.required]],
      total: ['', [Validators.required]],
      discount: ['', [Validators.required]],
      status_ids: [''],
      adults: ['', [Validators.required]],
      childrens: ['', [Validators.required]],
      notes: [''],
      client_id: ['', [Validators.required]],
      place_id: ['', [Validators.required]]
    });

  }

  private createClientForm()
  {
    this.clientForm = this.formBuilder.group({
      rut: ['', [Validators.required, this.rv]],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, CustomValidators.email]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      car_license: ['', ],
      car_brand: ['', ],
      car_model: ['', ],
      car_color: ['', ]
    });
  }

}
