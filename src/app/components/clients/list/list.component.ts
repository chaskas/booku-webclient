import { Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/toPromise';

import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { MdSort } from '@angular/material';
import { MdPaginator } from '@angular/material';

import { ClientService } from '../../../services/client.service';
import { Client } from '../../../model/client';

import { ClientsDatabase } from './clients-database';
import { ClientDataSource } from './client-datasource';
import { DialogsServiceService } from '../../../services/dialogs-service.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  title: string = "Listado de Clientes";
  clients: Client[];
  @Input() errors: string[];
  client: Client;
  displayedColumns = ['rut', 'full_name', 'email', 'phone', 'car_license', 'icons'];

  dataSource: ClientDataSource | null;

  @ViewChild(MdSort) sort: MdSort;
  @ViewChild(MdPaginator) paginator: MdPaginator;
  @ViewChild('filter') filter: ElementRef;

  constructor(
  	private clientService: ClientService,
    public snackBar: MdSnackBar,
    private _router: Router,
    private route: ActivatedRoute,
    public _clientsDatabase: ClientsDatabase,
    private dialogsService: DialogsServiceService
  	) { }

  ngOnInit() {
    this._clientsDatabase = new ClientsDatabase(this.route, this.clientService);
    this.dataSource = new ClientDataSource(this._clientsDatabase, this.sort, this.paginator);

    Observable.fromEvent(this.filter.nativeElement, 'keyup')
        .debounceTime(150)
        .distinctUntilChanged()
        .subscribe(() => {
          if (!this.dataSource) { return; }
          this.dataSource.filter = this.filter.nativeElement.value;
        });
  }

  public openDialog() {
    this.dialogsService
      .confirm('Confirmar', '¿Seguro que quiere eliminar?')
      .subscribe(res => this.deleteClient(res));
  }

  deleteClient(res: boolean): void
  {
    if(res) {
      this.clientService.deleteClient(this.client.id).then((data) => {
        this._router.navigate(['clients/']);
      });
    }
  }  

  private _handleErrors(error: any)
  {
    this.errors = error.json().errors.full_messages;
  }


}
