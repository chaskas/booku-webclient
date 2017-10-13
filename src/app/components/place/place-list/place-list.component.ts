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
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';

import { Place } from '../../../model/place';
import { PlaceService } from '../../../services/place.service';
import { PTypeService } from '../../../services/ptype.service';
import { PType } from '../../../model/ptype';

import { PlacesDatabase } from './places-database';
import { PlaceDataSource } from './place-datasource';

import { DialogsServiceService } from '../../../services/dialogs-service.service';


@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.css']
})
export class PlaceListComponent implements OnInit {

  title: string = "Listado de espacios";
  place: Place;
  ptypes: PType[];
  @Input() errors: string[];

  displayedColumns = ['ptype','name','capacity', 'price', 'opening', 'closing', 'icons'];

  dataSource: PlaceDataSource | null;

  constructor(
  	private placeService: PlaceService,
  	public _placesDatabase: PlacesDatabase,
    private ptypeService: PTypeService,
    private dialogsService: DialogsServiceService,
    private _router: Router,
    private route: ActivatedRoute
  	) { }

  ngOnInit() {

  	this._placesDatabase = new PlacesDatabase(this.placeService);
    this.dataSource = new PlaceDataSource(this._placesDatabase);

    this.ptypeService.getPTypes().then(
       ptypes => this.ptypes = ptypes,
       errors => this._handleError(errors)
      )
  }

    public openDialog() {
    this.dialogsService
      .confirm('Confirmar', '¿Seguro que quiere eliminar?')
      .subscribe(res => this.deletePlace(res));
  }

  deletePlace(res: boolean): void
  {
    if(res) {
      this.placeService.deletePlace(this.place.id).then((data) => {
        this._router.navigate(['place/list']);
      });
    }
  }

  private _handleError(error: any) {
      this.errors = error.json().errors.full_messages;
  }   
}
