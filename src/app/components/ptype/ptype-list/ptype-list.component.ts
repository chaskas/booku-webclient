import { Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';


import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { MdSort } from '@angular/material';
import { MdPaginator } from '@angular/material';

import { PTypeService } from '../../../services/ptype.service';
import { PType } from '../../../model/ptype';

import { PTypesDatabase } from './ptypes-database';
import { PTypeDataSource } from './ptype-datasource';
import { DialogsServiceService } from '../../../services/dialogs-service.service';
import { Angular2TokenService } from 'angular2-token';
@Component({
  selector: 'app-ptype-list',
  templateUrl: './ptype-list.component.html',
  styleUrls: ['./ptype-list.component.css']
})
export class PtypeListComponent implements OnInit {

  title: string = "Listado de Tipos de espacios";
  ptypes: PType[];
  @Input() errors: string[];
  ptype: PType;
  displayedColumns = ['name','plural', 'icons'];

  dataSource: PTypeDataSource | null;


  constructor(
  	private ptypeService: PTypeService,
    public snackBar: MdSnackBar,
    private _router: Router,
    private route: ActivatedRoute,
    public _ptypesDatabase: PTypesDatabase,
    private dialogsService: DialogsServiceService,
    private _tokenService: Angular2TokenService
  	) { 

    this._tokenService.validateToken().subscribe(
      res =>      console.log("Token Valid!"),
      error =>    this._handleTokenError(error)
    );


  }

  ngOnInit() {
    this._ptypesDatabase = new PTypesDatabase(this.route, this.ptypeService);
    this.dataSource = new PTypeDataSource(this._ptypesDatabase);

  }

  public openDialog() {
    this.dialogsService
      .confirm('Confirmar', '¿Seguro que quiere eliminar?')
      .subscribe(res => this.deletePType(res));
  }

  deletePType(res: boolean): void
  {
    if(res) {
      this.ptypeService.deletePType(this.ptype.id).then((data) => {
        this._router.navigate(['ptype/list']);
      });
    }
  }  

  private _handleErrors(error: any)
  {
    this.errors = error.json().errors.full_messages;
  }

  private _handleTokenError(error: any) {
    var config: MdSnackBarConfig = new MdSnackBarConfig();
    config.duration = 1000;
    this.snackBar.open("Su sesión ha expirado.", undefined, config);
    this._router.navigate(['/signin']);
  }

}
