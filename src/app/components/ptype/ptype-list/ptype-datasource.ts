import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';


import { PTypesDatabase } from './ptypes-database';
import { PType } from '../../../model/ptype';

export class PTypeDataSource extends DataSource<any> {
  constructor(public _ptypesDatabase: PTypesDatabase) {
    super();
  }

  connect(): Observable<PType[]> {

    const displayDataChanges = [
      this._ptypesDatabase.dataChange
    ];

    var data = this._ptypesDatabase.data.slice();

    return Observable.merge(...displayDataChanges).map(() => {
      
      const data = this._ptypesDatabase.data.slice();

      return data.slice();
    });
  }
  

  disconnect() {}

}
