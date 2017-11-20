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
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-booking-client-edit',
  templateUrl: './booking-client-edit.component.html',
  styleUrls: ['./booking-client-edit.component.css']
})
export class BookingClientEditComponent implements OnInit {
	client: Client
  clients: Client[];
  clientForm: FormGroup;
  client_id: number;
  newClient: number;

 	@Input() errors: string[];
  @Input() success: string;

  rut = new FormControl();
  filteredClients: Observable<Client[]>;


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

  filter(rut: string): Client[]
  {

    if(typeof this.rut.value === 'object'){

      this.client_id = this.rut.value.id;

      
      this.clientService.getClient(this.client_id).then(client => this.fillForm(client));

      this.newClient = 1;
    }

    return this.clients.filter(client =>
      client.rut.toLowerCase().indexOf(rut.toLowerCase()) === 0);

  }
  
  displayFn(client: Client): string
  {
      
      return client ? client.rut: null;
 
  }

  ngOnInit() {

	  this.clientService.getClient(this.data.client.id).then(client => this.getClientSuccess(client));
    this.clientService.getClients().then(clients => this.handleGetClientsSuccess(clients));

  }

  private getClientSuccess(client: Client){
    this.client = client;
  }

   private fillForm(client: Client){
    this.clientForm.patchValue({ 
      'rut': client.rut,
      'first_name': client.first_name,
      'last_name': client.last_name,
      'email': client.email,
      'address': client.address,
      'city': client.city,
      'phone': client.phone,
      'car_license': client.car_license,
      'car_brand': client.car_brand,
      'car_model': client.car_model,
      'car_color': client.car_color
     });
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
		car_license: [this.data.client.car_license],
		car_brand: [this.data.client.car_brand],
		car_model: [this.data.client.car_model],
		car_color: [this.data.client.car_color]

    });

    this.rut.setValue(this.data.client);
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

  private handleGetClientsSuccess(clients: Client[])
  {
    this.clients = clients;

    this.filteredClients = this.rut.valueChanges
      .startWith(null)
      .map(client => client && typeof client === 'object' ? client.rut : client)
      .map(rut => rut ? this.filter(rut) : this.clients.slice());
  }

}
