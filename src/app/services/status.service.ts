import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AppConfig } from '../config/app-config';
import { Status } from '../model/status';
import { PType } from '../model/ptype';

@Injectable()
export class StatusService {

  private url = this.config.get('host') + '/statuses';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(
    private http: Http,
    private config: AppConfig
  ) { }

  createStatus(status: Status) : Promise<Status>
	{

    let body = JSON.stringify({
                      name: status.name,
                      color: status.color,
                      price: status.price
                    });

    let headers      = new Headers({ 'Content-Type': 'application/json' });
    let options      = new RequestOptions({ headers: headers });

    return this.http.post(this.url, body, options)
              .toPromise()
              .then(response => response.json() as Status)
              .catch(this.handleError);
  }

  getStatuses(): Promise<Status[]> {

    return this.http.get(this.url)
                 .toPromise()
                 .then(response => response.json() as Status[])
                 .catch(this.handleError);

  }

  getStatusesByIds(status_ids: Array<number>): Promise<Status[]>
  {
    let url = this.config.get('host') + '/statuses/by/ids';

    let body = JSON.stringify({
                      status_ids: status_ids
                    });

    let headers      = new Headers({ 'Content-Type': 'application/json' });
    let options      = new RequestOptions({ headers: headers });

    return this.http.post(url, body, options)
              .toPromise()
              .then(response => response.json() as Status[])
              .catch(this.handleError);
  }

  getStatus(id: number): Promise<Status> {
    return this.http.get(this.url + '/' + id)
               .toPromise()
               .then(response => response.json() as Status)
               .catch(this.handleError);
  }

  updateStatus(id: number, status: Status): Promise<Status>
  {
    status.id = id;
    const url = `${this.url}/${status.id}`;

    let body = JSON.stringify({
                          id: status.id,
                          name: status.name,
                          color: status.color,
                          price: status.price
                        });

    let headers      = new Headers({ 'Content-Type': 'application/json' });
    let options      = new RequestOptions({ headers: headers });

    return this.http.put(url,body, options)
             .toPromise()
             .then(response => response.json() as Status)
             .catch(this.handleError);
  }

  deleteStatus(id: number): Promise<any>
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
