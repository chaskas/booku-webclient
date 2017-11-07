import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';


import { StatusesDatabase } from './statuses-database';
import { Status } from '../../../model/status';

export class StatusDataSource extends DataSource<any> {
  constructor(public _statusesDatabase: StatusesDatabase) {
    super();
  }

  connect(): Observable<Status[]> {

    const displayDataChanges = [
      this._statusesDatabase.dataChange
    ];

    var data = this._statusesDatabase.data.slice();

    return Observable.merge(...displayDataChanges).map(() => {
      
      const data = this._statusesDatabase.data.slice();

      return data.slice();
    });
  }
  

  disconnect() {}

}