import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';


import { UsersDatabase } from './users-database';
import { User } from '../../../model/user';

export class UserDataSource extends DataSource<any> {
  constructor(public _usersDatabase: UsersDatabase) {
    super();
  }

  connect(): Observable<User[]> {

    const displayDataChanges = [
      this._usersDatabase.dataChange
    ];

    var data = this._usersDatabase.data.slice();

    return Observable.merge(...displayDataChanges).map(() => {
      
      const data = this._usersDatabase.data.slice();

      return data.slice();
    });
  }
  

  disconnect() {}

}
