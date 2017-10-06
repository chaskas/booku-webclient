import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import 'rxjs/add/operator/switchMap';

import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

import { rutClean } from 'rut-helpers';

import { Client } from '../../../model/client';

import { ClientService } from '../../../services/client.service';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  client: Client;
  constructor(
  	private clientService: ClientService,
  	private route: ActivatedRoute
  	) { 

	this.route.params
	.switchMap((params: Params) => this.clientService.getClient(+params['id']))
	.subscribe(client => this._handleGetClientSuccess(client));
  }

  ngOnInit() {
  }

  private _handleGetClientSuccess(client: Client)
   {
    this.client = client;

    var rut = rutClean(client.rut);
    var rutDigits = parseInt(rut, 10);
    var m = 0;
    var s = 1;
    while (rutDigits > 0) {
        s = (s + rutDigits % 10 * (9 - m++ % 6)) % 11;
        rutDigits = Math.floor(rutDigits / 10);
    }
    var checkDigit = (s > 0) ? String((s - 1)) : 'K';

    client.rut = client.rut + "-" + checkDigit;
	}
}
