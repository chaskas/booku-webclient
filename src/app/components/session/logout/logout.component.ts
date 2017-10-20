import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Angular2TokenService } from 'angular2-token';

import { SessionService } from '../../../services/session.service';

@Component({
  template: ''
})
export class LogoutComponent implements OnInit {

  constructor(
    private _router: Router,
    private sessionService: SessionService
  ) { }

  ngOnInit() {
    this.sessionService.doLogout();
    this._router.navigate(['signin']);
  }

}
