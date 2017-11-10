import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatDialogRef, MatSnackBarConfig } from '@angular/material';
import { ActivatedRoute, Params }   from '@angular/router';

import { ClientService } from '../../../services/client.service';
import { Client } from '../../../model/client';
import { DialogsServiceService } from '../../../services/dialogs-service.service';
import { Angular2TokenService } from 'angular2-token';

import { CustomValidators } from 'ng2-validation';
import { RutValidator } from '../../../utils/rut/ng2-rut.module'

import { rutClean } from 'rut-helpers';

@Component({
  selector: 'app-booking-client-edit',
  templateUrl: './booking-client-edit.component.html',
  styleUrls: ['./booking-client-edit.component.css']
})
export class BookingClientEditComponent implements OnInit {
	client: Client;
	clientForm: FormGroup;

 	@Input() errors: string[];
    @Input() success: string;

  constructor(
      public dialogRef: MatDialogRef<BookingClientEditComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
  	  private clientService: ClientService,
      private dialogsService: DialogsServiceService,
  	  private rv: RutValidator,
	  private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      public snackBar: MatSnackBar,
      private _router: Router,
      private _tokenService: Angular2TokenService

  	) { 

  	this.createForm();

  }

  ngOnInit() {

	this.clientService.getClient(this.data.client.id).then(client => this.client = client);

  }

   private createForm()
	{
    this.clientForm = this.formBuilder.group({
		rut: [this.data.client.rut, [Validators.required, this.rv]],
		first_name: [this.data.client.first_name, [Validators.required]],
		last_name: [this.data.client.last_name, [Validators.required]],
		email: [this.data.client.email, [Validators.required, CustomValidators.email]],
		address: [this.data.client.address, [Validators.required]],
		city: [this.data.client.city, [Validators.required]],
		phone: [this.data.client.phone, [Validators.required]],
		car_license: ['', ],
		car_brand: ['', ],
		car_model: ['', ],
		car_color: ['', ]

    });
	}

  updateClient()
  {
  	this.clientService.updateClient(this.client.id, this.clientForm.value).then(
  		res => this.handleEditSuccess(res),
  		error => this.handleError(error)
  	);
  }
  private handleEditSuccess(data: any) {
    this.errors = null;
    this.snackBar.open("Cliente actualizado correctamente", "OK", {
      duration: 2000,
    });

    this.dialogRef.close();

  }

  private handleError(error: any) {
      this.snackBar.open(error.json(), null, {
        duration: 2000,
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
