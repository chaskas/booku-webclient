import { Angular2TokenService } from 'angular2-token';
import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { CustomValidators } from 'ng2-validation';

import { SessionService } from '../../../services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  email: FormControl = new FormControl("", Validators.compose([Validators.required, CustomValidators.email]));
  password: FormControl = new FormControl("", Validators.required);

  @Input() errors: string[];
  constructor(
    private _router: Router,
    private formBuilder: FormBuilder,
    private _tokenService: Angular2TokenService,
    private sessionService: SessionService,
    public snackBar: MatSnackBar
  	) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password
    });
  }

  doLogin()
  {
    let email = this.email.value;
    let password = this.password.value;

    this.sessionService.doLogin(email, password).subscribe(
      res =>      this._handleSuccess(res),
      error =>    this._handleError(error)
    );
  }

  private _handleSuccess(data: any) {
      this.errors = null;
      this._router.navigate(['/']);
  }

  private _handleError(error: any) {
      this.errors = error.json().errors;
      var config: MatSnackBarConfig = new MatSnackBarConfig();
      config.duration = 1000;
      this.snackBar.open("Usuario y/o Contraseña Incorrecto", undefined, config);
  }  

}
