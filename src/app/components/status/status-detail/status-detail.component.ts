import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import 'rxjs/add/operator/switchMap';

import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

import { Status } from '../../../model/status';

import { StatusService } from '../../../services/status.service';
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-status-detail',
  templateUrl: './status-detail.component.html',
  styleUrls: ['./status-detail.component.css']
})
export class StatusDetailComponent implements OnInit {
  status: Status;
 
  constructor(
	private statusService: StatusService,
  	private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private _router: Router,
    private _tokenService: Angular2TokenService
  	) { 

    this._tokenService.validateToken().subscribe(
      res =>      console.log("Token Valid!"),
      error =>    this._handleTokenError(error)
    );
	this.route.params
	.switchMap((params: Params) => this.statusService.getStatus(+params['id']))
	.subscribe(status => this._handleGetStatusSuccess(status));
    
  }

  ngOnInit() {
  }
  private _handleGetStatusSuccess(status: Status)
  {
    this.status = status;
  }

  private _handleTokenError(error: any) {
    var config: MatSnackBarConfig = new MatSnackBarConfig();
    config.duration = 1000;
    this.snackBar.open("Su sesión ha expirado.", undefined, config);
    this._router.navigate(['/signin']);
  }
}
