import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AppConfig } from '../config/app-config';
import { Booking } from '../model/booking';
import { Matrix } from '../model/matrix';

@Injectable()
export class BookingService {

  private url = this.config.get('host') + '/bookings';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(
    private http: Http,
    private config: AppConfig
  ) { }

  createBooking(booking: Booking) : Promise<Booking>
	{

    let body = JSON.stringify({
                          arrival: booking.arrival,
                          departure: booking.departure,
                          subtotal: booking.subtotal,
                          total: booking.total,
                          discount: booking.discount,
                          status_ids: booking.status_ids,
                          adults: booking.adults,
                          childrens: booking.childrens,
                          client_id: booking.client_id,
                          place_id: booking.place_id
                        });

    let headers      = new Headers({ 'Content-Type': 'application/json' });
    let options      = new RequestOptions({ headers: headers });

    return this.http.post(this.url, body, options)
              .toPromise()
              .then(response => response.json() as Booking)
              .catch(this.handleError);
  }

  getBookings(): Promise<Booking[]> {

    return this.http.get(this.url)
                 .toPromise()
                 .then(response => response.json() as Booking[])
                 .catch(this.handleError);

  }

  getBookingsByDayAndPlace(day: Date, ndays: number, ptype_id: number) {

    let body = JSON.stringify({
                      day: day,
                      ndays: ndays,
                      ptype: ptype_id
                    });

    let headers      = new Headers({ 'Content-Type': 'application/json' });
    let options      = new RequestOptions({ headers: headers });

    return this.http.post(this.url + '/agenda/monthly', body, options)
              .toPromise()
              .then(response => response.json() as Matrix[])
              .catch(this.handleError);

  }

  getBooking(id: number): Promise<Booking> {
    return this.http.get(this.url + '/' + id)
               .toPromise()
               .then(response => response.json() as Booking)
               .catch(this.handleError);
  }

  updateBooking(id: number, booking: Booking): Promise<Booking>
  {
    booking.id = id;
    const url = `${this.url}/${booking.id}`;

    let body = JSON.stringify({
                          arrival: booking.arrival,
                          departure: booking.departure,
                          subtotal: booking.subtotal,
                          total: booking.total,
                          discount: booking.discount,
                          status_ids: booking.status_ids,
                          adults: booking.adults,
                          childrens: booking.childrens,
                          client_id: booking.client_id,
                          place_id: booking.place_id
                        });

    let headers      = new Headers({ 'Content-Type': 'application/json' });
    let options      = new RequestOptions({ headers: headers });

    return this.http.put(url,body, options)
             .toPromise()
             .then(response => response.json() as Booking)
             .catch(this.handleError);
  }

  deleteBooking(id: number): Promise<any>
  {
    const url = `${this.url}/${id}`;
    return this.http.delete(url)
                .toPromise()
                .catch(this.handleError);
  }

  private handleError(error: any): Promise<any>
  {
    return Promise.reject(error.message || error);
  }

}
