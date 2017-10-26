import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Angular2TokenService } from 'angular2-token';

@Injectable()
export class SessionService {

  constructor(
    private _tokenService: Angular2TokenService,
    private _router: Router,
    private _http: Http
  ) { }

  doLogin(email: string, password: string) : Observable<Response>
  {
    return this._tokenService.signIn({
      email:                email,
      password:             password
    });
  }

  doRegister(email: string, password: string, password_confirmation: string) : Observable<Response>
  {
    return this._tokenService.registerAccount({
      email:                email,
      password:             password,
      passwordConfirmation: password_confirmation
    });
  }

  doLogout()
  {
    this._tokenService.signOut().subscribe(
        res =>      console.log("bye"),
        error =>    console.log(error) // TODO corregir
    );
  }
  
}
