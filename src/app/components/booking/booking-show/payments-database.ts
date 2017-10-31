import { Injectable } from '@angular/core';

import { ActivatedRoute, Params } from '@angular/router';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { PaymentService } from '../../../services/payment.service';

import { Payment } from '../../../model/payment';


@Injectable()
export class PaymentsDatabase {

  dataChange: BehaviorSubject<Payment[]> = new BehaviorSubject<Payment[]>([]);
  get data(): Payment[] { return this.dataChange.value; }

  constructor(private route: ActivatedRoute, private paymentService: PaymentService) {
    this.initialize();
  }

  setPayments(payments: Payment[]){
    this.data.splice(0);
    for (let i = 0; i < payments.length; i++) { this.addPayment(payments[i]); }
  }

  initialize(){

    this.route.params
      .switchMap((params: Params) => this.paymentService.getPaymentsByBookingId(+params['id']))
      .subscribe(payments => this.setPayments(payments));

    // this.paymentService.getPayments().then(payments => this.setPayments(payments));

  }

  addPayment(payment: Payment) {
    const copiedData = this.data.slice();
    copiedData.push(payment);
    this.dataChange.next(copiedData);
  }

}
