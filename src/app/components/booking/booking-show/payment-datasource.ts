import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { PaymentsDatabase } from './payments-database';
import { Payment } from '../../../model/payment';

export class PaymentDataSource extends DataSource<any> {
  constructor(public _paymentsDatabase: PaymentsDatabase) {
    super();
  }

  connect(): Observable<Payment[]> {

    const displayDataChanges = [
      this._paymentsDatabase.dataChange
    ];

    var data = this._paymentsDatabase.data.slice();

    return Observable.merge(...displayDataChanges).map(() => {

      const data = this._paymentsDatabase.data.slice();

      return data.slice();
    });

  }

  disconnect() {}
}
