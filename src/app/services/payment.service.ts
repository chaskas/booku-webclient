import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AppConfig } from '../config/app-config';
import { Payment } from '../model/payment';

@Injectable()
export class PaymentService {

  private url = this.config.get('host') + '/payments';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(
    private http: Http,
    private config: AppConfig
  ) { }

  createPayment(payment: Payment) : Promise<Payment>
	{

    let body = JSON.stringify({
                          amount: payment.amount,
                          method: payment.method,
                          bill: payment.bill,
                          booking_id: payment.booking_id
                        });

    let headers      = new Headers({ 'Content-Type': 'application/json' });
    let options      = new RequestOptions({ headers: headers });

    return this.http.post(this.url, body, options)
              .toPromise()
              .then(response => response.json() as Payment)
              .catch(this.handleError);
  }

  getPayments(): Promise<Payment[]> {

    return this.http.get(this.url)
                 .toPromise()
                 .then(response => response.json() as Payment[])
                 .catch(this.handleError);

  }

  getPaymentsByBookingId(id: number): Promise<Payment[]> {

    return this.http.get(this.url+'/b/'+id)
                 .toPromise()
                 .then(response => response.json() as Payment[])
                 .catch(this.handleError);

  }

  getPayment(id: number): Promise<Payment> {
    return this.http.get(this.url + '/' + id)
               .toPromise()
               .then(response => response.json() as Payment)
               .catch(this.handleError);
  }

  updatePayment(id: number, payment: Payment): Promise<Payment>
  {
    payment.id = id;
    const url = `${this.url}/${payment.id}`;

    let body = JSON.stringify({
                          id: payment.id,
                          amount: payment.amount,
                          method: payment.method,
                          bill: payment.bill,
                          booking_id: payment.booking_id
                        });

    let headers      = new Headers({ 'Content-Type': 'application/json' });
    let options      = new RequestOptions({ headers: headers });

    return this.http.put(url,body, options)
             .toPromise()
             .then(response => response.json() as Payment)
             .catch(this.handleError);
  }

  deletePayment(id: number): Promise<any>
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
