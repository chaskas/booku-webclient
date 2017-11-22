import { Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';


import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { MatSort } from '@angular/material';
import { MatPaginator } from '@angular/material';

import { UserService } from '../../../services/user.service';
import { User } from '../../../model/user';

import { UsersDatabase } from './users-database';
import { UserDataSource } from './user-datasource';
import { DialogsServiceService } from '../../../services/dialogs-service.service';
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  title: string = "Listado de Usuarios";
  users: User[];
  @Input() errors: string[];
  user: User;
  displayedColumns = ['name','email'];

  dataSource: UserDataSource | null;
  constructor(
  	private userService: UserService,
    public snackBar: MatSnackBar,
    private _router: Router,
    private route: ActivatedRoute,
    public _usersDatabase: UsersDatabase,
    private dialogsService: DialogsServiceService,
    private _tokenService: Angular2TokenService
  	) {

    this._tokenService.validateToken().subscribe(
      res =>      console.log("Token Valid!"),
      error =>    this._handleTokenError(error)
    );
  	 }

  ngOnInit() {
    this._usersDatabase = new UsersDatabase(this.route, this.userService);
    this.dataSource = new UserDataSource(this._usersDatabase);
  }

  public openDialog(id: number) {
    this.dialogsService
      .confirm('Confirmar', '¿Seguro que quiere eliminar?')
      .subscribe(res => this.deleteUser(res, id));
  }

  deleteUser(res: boolean, id: number): void
  {
    if(res) {
      this.userService.deleteUser(id).then((data) => {
        this._usersDatabase = new UsersDatabase(this.route, this.userService);
        this.dataSource = new UserDataSource(this._usersDatabase);
      });
      this._router.navigate(['/signout']);
    }
  }   

  private _handleErrors(error: any)
  {
    this.errors = error.json().errors.full_messages;
  }

  private _handleTokenError(error: any) {
    var config: MatSnackBarConfig = new MatSnackBarConfig();
    config.duration = 1000;
    this.snackBar.open("Su sesión ha expirado.", undefined, config);
    this._router.navigate(['/signin']);
  }
}
