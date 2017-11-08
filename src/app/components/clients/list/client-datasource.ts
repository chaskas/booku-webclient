import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';

import { MatSort } from '@angular/material';
import { MatPaginator } from '@angular/material';

import { ClientsDatabase } from './clients-database';
import { Client } from '../../../model/client';

export class ClientDataSource extends DataSource<any> {
  constructor(public _clientsDatabase: ClientsDatabase, private _sort: MatSort, private _paginator: MatPaginator) {
    super();
  }

  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  connect(): Observable<Client[]> {
    const displayDataChanges = [
      this._clientsDatabase.dataChange,
      this._sort.sortChange,
      this._paginator.page,
      this._filterChange
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      var data = this.getSortedData();

      data = data.slice().filter((item: Client) => {
        let searchStr = (item.first_name + item.last_name + item.rut + item.phone).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) != -1;
      });

      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      return data.splice(startIndex, this._paginator.pageSize);
    });
  }

  disconnect() {}

  getSortedData(): Client[] {
    const data = this._clientsDatabase.data.slice();
    if (!this._sort.active || this._sort.direction == '') { return data; }

    return data.sort((a, b) => {
      let propertyA: number|string = '';
      let propertyB: number|string = '';

      switch (this._sort.active) {
        case 'rut': [propertyA, propertyB] = [a.rut, b.rut]; break;
        case 'full_name': [propertyA, propertyB] = [a.first_name + " " + a.last_name, b.first_name + " " + b.last_name]; break;
        case 'email': [propertyA, propertyB] = [a.email, b.email]; break;
      }

      let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
    });
  }
}
