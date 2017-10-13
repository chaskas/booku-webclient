import { Component, OnInit, Input } from '@angular/core';

import { ClientService } from '../../../services/client.service';
import { Client } from '../../../model/client';

import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
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
    public snackBar: MdSnackBar,
  	private clientService: ClientService,
    private _router: Router,
  	private formBuilder: FormBuilder

  ) {

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
	   this.snackBar.open("Miembro Registrado correctamente", "OK", {
	     duration: 2000,
	   });
     this._router.navigate(['/clients/']);

    }


  private _handleError(error: any) {
      this.snackBar.open(error.json()['rut'], null, {
        duration: 2000,
      });
  }
}
