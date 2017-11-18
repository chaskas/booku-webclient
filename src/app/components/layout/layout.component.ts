import { Component, OnInit } from '@angular/core';

import { PType } from '../../model/ptype';
import { Router, Params, ActivatedRoute } from '@angular/router';

import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { PTypeService } from '../../services/ptype.service';
import { Angular2TokenService } from 'angular2-token';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  ptypes: PType[];

  schedule_types: Array<String> = ['daily', 'hourly'];

  constructor(
    private ptypeService: PTypeService,
    private _router: Router,
    private route: ActivatedRoute,
    private _tokenService: Angular2TokenService,
    private snackBar: MatSnackBar

    ) {
    this._tokenService.validateToken().subscribe(
      res =>      console.log("Token Valid!"),
      error =>    this._handleTokenError(error)
    )
    this.ptypeService.getPTypes().then(ptypes => this.handleGetPtypesSuccess(ptypes));
  }

  ngOnInit() {
  }

  handleGetPtypesSuccess(ptypes: PType[]){
    this.ptypes = ptypes;
  }
  private _handleTokenError(error: any) {
    var config: MatSnackBarConfig = new MatSnackBarConfig();
    config.duration = 1000;
    this.snackBar.open("Su sesión ha expirado.", undefined, config);
    this._router.navigate(['/signin']);
  }
}
