import { Component, OnInit, Input } from '@angular/core';

import { ClientService } from '../../../services/client.service';
import { Client } from '../../../model/client';
import { Angular2TokenService } from 'angular2-token';

import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { CustomValidators } from 'ng2-validation';
import { RutValidator } from '../../../utils/rut/ng2-rut.module';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  client: Client;
  clientForm: FormGroup;
  @Input() errors: string[];
  @Input() success: string;

  constructor(
  	private rv: RutValidator,
    public snackBar: MatSnackBar,
  	private clientService: ClientService,
    private _router: Router,
  	private formBuilder: FormBuilder,
    private _tokenService: Angular2TokenService

  ) {
    this._tokenService.validateToken().subscribe(
      res =>      console.log("Token Valid!"),
      error =>    this._handleTokenError(error)
    );

  	this.createForm();
   }

  ngOnInit() {
  }

  createClient()
  {
    this.clientService.createClient(this.clientForm.value).then(
      res =>      this._handleUpdateSuccess(res),
      error =>    this._handleError(error)
    );
  }

	private createForm()
	{
    this.clientForm = this.formBuilder.group({
		rut: ['', [Validators.required, this.rv]],
		first_name: ['', [Validators.required]],
		last_name: ['', [Validators.required]],
		email: ['', [Validators.required, CustomValidators.email]],
		address: ['', [Validators.required]],
		city: ['', [Validators.required]],
		phone: ['', [Validators.required]],
		car_license: ['', ],
		car_brand: ['', ],
		car_model: ['', ],
		car_color: ['', ]
	  });
	}

	private _handleUpdateSuccess(data: any) {
	   this.errors = null;
	   this.snackBar.open("Cliente creado correctamente", "OK", {
	     duration: 2000,
	   });
     this._router.navigate(['/clients/']);

    }


  private _handleError(error: any) {
    var errorMsg = '';

      if(error.json()['rut']){
           errorMsg = 'El rut ingresado ya existe';
      }else{
        errorMsg = 'Ha ocurrido un error';
      }
      this.snackBar.open(errorMsg, null, {
        duration: 2000,
      });
  }

  private _handleTokenError(error: any) {
    var config: MatSnackBarConfig = new MatSnackBarConfig();
    config.duration = 1000;
    this.snackBar.open("Su sesión ha expirado.", undefined, config);
    this._router.navigate(['/signin']);
  }
}
