import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AppConfig } from '../config/app-config';
import { Client } from '../model/client';

@Injectable()
export class ClientService {

  private url = this.config.get('host') + '/clients';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(
    private http: Http,
    private config: AppConfig

  	) { }

    createClient(client: Client) : Promise<Client>
	{
    let url = this.config.get('host') + '/clients';

    var rut = "";

    if(client.rut.includes("-")){
      rut = client.rut.substring(0,client.rut.indexOf("-"))
    } else {
      rut =client.rut.substring(0,client.rut.length-1);
    }

    let body = JSON.stringify({
                          rut: rut,
                          first_name: client.first_name,
                          last_name: client.last_name,
                          email: client.email,
                          address: client.address,
                          city: client.city,
                          phone: client.phone,
                          car_license: client.car_license,
            						  car_brand: client.car_brand,
            						  car_model: client.car_model,
            						  car_color: client.car_color
                        });

    let headers      = new Headers({ 'Content-Type': 'application/json' });
    let options      = new RequestOptions({ headers: headers });

    return this.http.post(url, body, options)
              .toPromise()
              .then(response => response.json() as Client)
              .catch(this.handleError);
  }

   getClients(): Promise<Client[]> {
   return this.http.get(this.url)
               .toPromise()
               .then(response => response.json() as Client[])
               .catch(this.handleError);
  }

  getClient(id: number): Promise<Client> {
    return this.http.get(this.url + '/' + id)
               .toPromise()
               .then(response => response.json() as Client)
               .catch(this.handleError);
  }

  updateClient(id: number, client: Client): Promise<Client>
  {
    client.id = id;
    const url = `${this.url}/${client.id}`;

    var rut = "";

    if(client.rut.includes("-")){
      rut = client.rut.substring(0,client.rut.indexOf("-"))
    } else {
      rut = client.rut.substring(0,client.rut.length-1);
    }

    let body = JSON.stringify({
                          id: client.id,
                          rut: rut,
                          first_name: client.first_name,
                          last_name: client.last_name,
                          city: client.city,
                          email: client.email,
                          address: client.address,
                          phone: client.phone,
                          car_license: client.car_license,
                          car_brand: client.car_brand,
                          car_model: client.car_model,
                          car_color: client.car_color
                        });

    let headers      = new Headers({ 'Content-Type': 'application/json' });
    let options      = new RequestOptions({ headers: headers });

    return this.http.put(url,body, options)
             .toPromise()
             .then(response => response.json() as Client)
             .catch(this.handleError);
  }

  deleteClient(id: number): Promise<any>
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
