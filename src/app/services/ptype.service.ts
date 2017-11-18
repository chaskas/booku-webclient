import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AppConfig } from '../config/app-config';
import { PType } from '../model/ptype';

@Injectable()
export class PTypeService {

  private url = this.config.get('host') + '/ptypes';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(
    private http: Http,
    private config: AppConfig
  ) { }

  createPType(ptype: PType) : Promise<PType>
	{

    let body = JSON.stringify({
                          name: ptype.name,
                          plural: ptype.plural,
                          schedule_type: ptype.schedule_type,
                          opening: ptype.opening,
                          closing: ptype.closing
                        });

    let headers      = new Headers({ 'Content-Type': 'application/json' });
    let options      = new RequestOptions({ headers: headers });

    return this.http.post(this.url, body, options)
              .toPromise()
              .then(response => response.json() as PType)
              .catch(this.handleError);
  }

  getPTypes(): Promise<PType[]> {

    return this.http.get(this.url)
                 .toPromise()
                 .then(response => response.json() as PType[])
                 .catch(this.handleError);

  }

  getPType(id: number): Promise<PType> {
    return this.http.get(this.url + '/' + id)
               .toPromise()
               .then(response => response.json() as PType)
               .catch(this.handleError);
  }

  updatePType(id: number, ptype: PType): Promise<PType>
  {
    ptype.id = id;
    const url = `${this.url}/${ptype.id}`;

    let body = JSON.stringify({
                          id: ptype.id,
                          name: ptype.name,
                          plural: ptype.plural,
                          schedule_type: ptype.schedule_type,
                          opening: ptype.opening,
                          closing: ptype.closing
                        });

    let headers      = new Headers({ 'Content-Type': 'application/json' });
    let options      = new RequestOptions({ headers: headers });

    return this.http.put(url,body, options)
             .toPromise()
             .then(response => response.json() as PType)
             .catch(this.handleError);
  }

  deletePType(id: number): Promise<any>
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
