import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

import { ClientService } from '../../../services/client.service';
import { Client } from '../../../model/client';
import { DialogsServiceService } from '../../../services/dialogs-service.service';

import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Router } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { RutValidator } from '../../../utils/rut/ng2-rut.module'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { rutClean } from 'rut-helpers';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  client: Client;
  clientForm: FormGroup;
  @Input() errors: string[];
  @Input() success: string;

  constructor(
  	  private clientService: ClientService,
      private dialogsService: DialogsServiceService,
  	  private rv: RutValidator,
	    private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      public snackBar: MdSnackBar,
      private _router: Router
  	) { 


  	this.createForm();

    this.route.params
      .switchMap((params: Params) => this.clientService.getClient(+params['id']))
      .subscribe(client => this._handleGetClientSuccess(client));

  }

  ngOnInit() {
  }

  public openDialog() {
    this.dialogsService
      .confirm('Confirmar', '¿Seguro que quiere eliminar?')
      .subscribe(res => this.deleteClient(res));
  }

  updateClient()
  {
  	this.clientService.updateClient(this.client.id, this.clientForm.value).then(
  		res => this._handleUpdateSuccess(res),
  		error => this._handleError(error)
  	);
  }

  deleteClient(res: boolean): void
  {
    if(res) {
      this.clientService.deleteClient(this.client.id).then((data) => {
        this._router.navigate(['clients/']);
      });
    }
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
    
    this.clientForm.setValue({
      rut: client.rut,
      first_name: client.first_name,
      last_name: client.last_name,
      email: client.email,
      address: client.address,
      city: client.city,
      phone: client.phone,
      car_license: client.car_license,
      car_brand: client.car_brand,
      car_model: client.car_model,
      car_color: client.car_color

    });
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
		car_license: ['', [Validators.required]],
		car_brand: ['', [Validators.required]],
		car_model: ['', [Validators.required]],
		car_color: ['', [Validators.required]]

    });
	}

  private _handleUpdateSuccess(data: any) {
    this.errors = null;
    this.snackBar.open("Miembro actualizado correctamente", undefined, {
      duration: 2000,
    });
    this._router.navigate(['/clients']);
  }

  private _handleError(error: any) {
      this.errors = error.json().errors.full_messages;
  }  
}
