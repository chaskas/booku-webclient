import { Injectable } from '@angular/core';

import { ActivatedRoute, Params } from '@angular/router';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { PlaceService } from '../../../services/place.service';

import { Place } from '../../../model/place';


@Injectable()
export class PlacesDatabase {

  dataChange: BehaviorSubject<Place[]> = new BehaviorSubject<Place[]>([]);
  get data(): Place[] { return this.dataChange.value; }

  constructor(private placeService: PlaceService) {
    this.initialize();
  }

  setPlaces(places: Place[]){
    this.data.splice(0);
    for (let i = 0; i < places.length; i++) { this.addPlace(places[i]); }
  }

  initialize(){

    this.placeService.getPlaces().then(places => this.setPlaces(places));

  }

  addPlace(place: Place) {
    const copiedData = this.data.slice();
    copiedData.push(place);
    this.dataChange.next(copiedData);
  }

}
