import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Angular2TokenService } from 'angular2-token';

import { AppConfig } from '../config/app-config';
import { User } from '../model/user';

@Injectable()
export class UserService {

  private url = this.config.get('host');
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(
    private http: Http,
    private config: AppConfig,
    private tokenService: Angular2TokenService


  	) { }

  createUser(user: User) : Promise<User>
	{
    let url = this.url + '/auth';

    let body = JSON.stringify({
                          name: user.name,
                          email: user.email,
                          password: user.password,
                          password_confirmation: user.password_confirmation
                        });

    let headers      = new Headers({ 'Content-Type': 'application/json' });
    let options      = new RequestOptions({ headers: headers });

    return this.http.post(url, body, options)
              .toPromise()
              .then(response => response.json() as User)
              .catch(this.handleError);
  }

   getUsers(): Promise<User[]> {

     let url = this.url + '/users';

   return this.http.get(url)
               .toPromise()
               .then(response => response.json() as User[])
               .catch(this.handleError);
  }

  getUser(id: number): Promise<User> {

    let url = this.url + '/users/' + id;

    return this.http.get(url)
               .toPromise()
               .then(response => response.json() as User)
               .catch(this.handleError);
  }

  updateUser(id: number, user: User): Promise<User>
  {
    user.id = id;
    let url = 'auth';

    let body = JSON.stringify({
                          name: user.name,
                          email: user.email,
                          password: user.password,
                          password_confirmation: user.password_confirmation
                        });

    return this.tokenService.put(url,body)
             .toPromise()
             .then(response => response.json() as User)
             .catch(this.handleError);
  }

  deleteUser(id: number): Promise<any>
  {
    let url = 'auth';
    return this.tokenService.delete(url)
                .toPromise()
                .catch(this.handleError);
  }

  private handleError(error: any): Promise<any>
  {
    return Promise.reject(error.message || error);
  }
}
