import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AppConfig } from '../config/app-config';
import { Place } from '../model/place';

@Injectable()
export class PlaceService {

  private url = this.config.get('host') + '/places';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(
    private http: Http,
    private config: AppConfig
  ) { }

  createPlace(place: Place) : Promise<Place>
	{

    let body = JSON.stringify({
                      ptype_id: place.ptype_id,
                      capacity: place.capacity,
                      price: place.price,
                      opening: place.opening,
                      closing: place.closing
                    });

    let headers      = new Headers({ 'Content-Type': 'application/json' });
    let options      = new RequestOptions({ headers: headers });

    return this.http.post(this.url, body, options)
              .toPromise()
              .then(response => response.json() as Place)
              .catch(this.handleError);
  }

  getPlaces(): Promise<Place[]> {

    return this.http.get(this.url)
                 .toPromise()
                 .then(response => response.json() as Place[])
                 .catch(this.handleError);

  }

  getPlace(id: number): Promise<Place> {
    return this.http.get(this.url + '/' + id)
               .toPromise()
               .then(response => response.json() as Place)
               .catch(this.handleError);
  }

  updatePlace(id: number, place: Place): Promise<Place>
  {
    place.id = id;
    const url = `${this.url}/${place.id}`;

    let body = JSON.stringify({
                          id: place.id,
                          ptype_id: place.ptype_id,
                          capacity: place.capacity,
                          price: place.price,
                          opening: place.opening,
                          closing: place.closing
                        });

    let headers      = new Headers({ 'Content-Type': 'application/json' });
    let options      = new RequestOptions({ headers: headers });

    return this.http.put(url,body, options)
             .toPromise()
             .then(response => response.json() as Place)
             .catch(this.handleError);
  }

  deletePlace(id: number): Promise<any>
  {
    const url = `${this.url}/${id}`;
    return this.http.delete(url)
                .toPromise()
                .catch(this.handleError);
  }

  private handleError(error: any): Promise<any>
  {
    return Promise.reject(error.message || error);
  }

}
