import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { PlacesDatabase } from './places-database';
import { Place } from '../../../model/place';

export class PlaceDataSource extends DataSource<any> {
  constructor(public _placesDatabase: PlacesDatabase) {
    super();
  }

  connect(): Observable<Place[]> {

    const displayDataChanges = [
      this._placesDatabase.dataChange
    ];

    var data = this._placesDatabase.data.slice();

    return Observable.merge(...displayDataChanges).map(() => {
      
      const data = this._placesDatabase.data.slice();

      return data.slice();
    });

  }

  disconnect() {}
}
