import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import 'rxjs/add/operator/switchMap';

import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

import { PType } from '../../../model/ptype';

import { PTypeService } from '../../../services/ptype.service';
import { Angular2TokenService } from 'angular2-token';
@Component({
  selector: 'app-ptype-detail',
  templateUrl: './ptype-detail.component.html',
  styleUrls: ['./ptype-detail.component.css']
})
export class PtypeDetailComponent implements OnInit {

	ptype: PType;

  constructor(
	  private PTypeService: PTypeService,
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
	.switchMap((params: Params) => this.PTypeService.getPType(+params['id']))
	.subscribe(ptype => this._handleGetPTypeSuccess(ptype));
    
  }

  ngOnInit() {
  }

  private _handleGetPTypeSuccess(ptype: PType)
  {
    this.ptype = ptype;
  }

  private _handleTokenError(error: any) {
    var config: MatSnackBarConfig = new MatSnackBarConfig();
    config.duration = 1000;
    this.snackBar.open("Su sesión ha expirado.", undefined, config);
    this._router.navigate(['/signin']);
  }
}
