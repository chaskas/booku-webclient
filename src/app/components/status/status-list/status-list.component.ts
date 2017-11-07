import { Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';


import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { MatSort } from '@angular/material';
import { MatPaginator } from '@angular/material';

import { StatusService } from '../../../services/status.service';
import { Status } from '../../../model/status';

import { StatusesDatabase } from './statuses-database';
import { StatusDataSource } from './status-datasource';
import { DialogsServiceService } from '../../../services/dialogs-service.service';
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-status-list',
  templateUrl: './status-list.component.html',
  styleUrls: ['./status-list.component.css']
})
export class StatusListComponent implements OnInit {

  title: string = "Listado de Tipos de espacios";
  statuses: Status[];
  @Input() errors: string[];
  status: Status;
  displayedColumns = ['name', 'icons'];

  dataSource: StatusDataSource | null;

  constructor(
  	private statusService: StatusService,
    public snackBar: MatSnackBar,
    private _router: Router,
    private route: ActivatedRoute,
    public _statusesDatabase: StatusesDatabase,
    private dialogsService: DialogsServiceService,
    private _tokenService: Angular2TokenService
  	) { 

    this._tokenService.validateToken().subscribe(
      res =>      console.log("Token Valid!"),
      error =>    this._handleTokenError(error)
    );
}

  ngOnInit() {
    this._statusesDatabase = new StatusesDatabase(this.route, this.statusService);
    this.dataSource = new StatusDataSource(this._statusesDatabase);

  }

  public openDialog() {
    this.dialogsService
      .confirm('Confirmar', '¿Seguro que quiere eliminar?')
      .subscribe(res => this.deleteStatus(res));
  }

  deleteStatus(res: boolean): void
  {
    if(res) {
      this.statusService.deleteStatus(this.status.id).then((data) => {
        this._router.navigate(['statuses/list']);
      });
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
