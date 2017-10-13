import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import 'rxjs/add/operator/switchMap';

import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

import { PType } from '../../../model/ptype';

import { PTypeService } from '../../../services/ptype.service';
@Component({
  selector: 'app-ptype-detail',
  templateUrl: './ptype-detail.component.html',
  styleUrls: ['./ptype-detail.component.css']
})
export class PtypeDetailComponent implements OnInit {

	ptype: PType;

  constructor(
	private PTypeService: PTypeService,
  	private route: ActivatedRoute
  	) { 

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
}
