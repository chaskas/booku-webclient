import { Component, OnInit, Input } from '@angular/core';
import {MatStepperModule} from '@angular/material';
import { ClientService } from '../../../services/client.service';
import { Client } from '../../../model/client';
import { Router, ActivatedRoute, Params }   from '@angular/router';

import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { CustomValidators } from 'ng2-validation';
import { RutValidator } from '../../../utils/rut/ng2-rut.module';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { rutClean } from 'rut-helpers';
import { Angular2TokenService } from 'angular2-token';

@Component({
  selector: 'app-booking-new',
  templateUrl: './booking-new.component.html',
  styleUrls: ['./booking-new.component.css']
})
export class BookingNewComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
 	secondFormGroup: FormGroup;
  newClient = 1;
  clients: Client[];
  client: Client;
  client_id: number;
  clientForm: FormGroup;
  @Input() errors: string[];
  @Input() success: string;

  constructor(
    private rv: RutValidator,
    public snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private clientService: ClientService,
  	private formBuilder: FormBuilder,
    private _router: Router,
    private _tokenService: Angular2TokenService

  	) {
     this._tokenService.validateToken().subscribe(
      res =>      console.log("Token Valid!"),
      error =>    this._handleTokenError(error)
    );    
     }

  ngOnInit() {
    this.clientService.getClients().then(clients => this.clients = clients);
  	this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
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
  createClient()
  {
    this.clientService.createClient(this.clientForm.value).then(
      res =>      this._handleUpdateSuccess(res),
      error =>    this._handleError(error)
    );
  }

  private getClient(){
    this.route.params
    .switchMap((params: Params) => this.clientService.getClient(this.client_id))
    .subscribe(client => this._handleGetClientSuccess(client));
 
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

  private _handleUpdateSuccess(data: Client) {

    this.clientService.getClients().then(clients => this.handleCreateClientSuccess(clients));

    this.client_id = data.id;

    this.errors = null;
    this.snackBar.open("Miembro Registrado correctamente", "OK", {
     duration: 2000,
    });

  }

  private handleCreateClientSuccess(clients: Client[]){

    this.clients = clients;
    
    this.newClient = 1;

    
  }


  private _handleError(error: any) {
      this.snackBar.open(error.json()['rut'], null, {
        duration: 2000,
      });
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

  private _handleTokenError(error: any) {
    var config: MatSnackBarConfig = new MatSnackBarConfig();
    config.duration = 1000;
    this.snackBar.open("Su sesión ha expirado.", undefined, config);
    this._router.navigate(['/signin']);
  }

}
