import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute, Params }   from '@angular/router';

import { UserService } from '../../../services/user.service';
import { User } from '../../../model/user';

import { Angular2TokenService } from 'angular2-token';

import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { CustomValidators } from 'ng2-validation';
import { RutValidator } from '../../../utils/rut/ng2-rut.module';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user: User;
  userForm: FormGroup;
  @Input() errors: string[];
  @Input() success: string;

  name: FormControl = new FormControl("", Validators.required);
  email: FormControl = new FormControl("", Validators.compose([Validators.required, CustomValidators.email]));
  password: FormControl = new FormControl("", Validators.compose([Validators.minLength(8)]));
  password_confirmation: FormControl = new FormControl("", Validators.compose([CustomValidators.equalTo(this.password)]));

  constructor(
    public snackBar: MatSnackBar,
    private userService: UserService,
    private _router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _tokenService: Angular2TokenService

  ) {

    this._tokenService.validateToken().subscribe(
      res =>      _tokenService.currentUserData.id,
      error =>    this._handleTokenError(error)
    );

    this.createForm();
      this.route.params
        .switchMap((params: Params) => this.userService.getUser(+params['id']))
        .subscribe(user => this._handleGetUserSuccess(user));
  }

  ngOnInit() {

  }

  updateUser()
  {
    this.userService.updateUser(this.user.id, this.userForm.value).then(
      res => this._handleUpdateSuccess(res),
      error => this._handleError(error)
    );
  }

  private createForm()
  {
    this.userForm = this.formBuilder.group({
    name: this.name,
    email: this.email,
    password: this.password,
    password_confirmation: this.password_confirmation
    });
  }

  private _handleUpdateSuccess(data: any)
  {
    this.errors = null;
    this.snackBar.open("Actualizado correctamente", undefined, {
      duration: 2000,
    });
    this._router.navigate(['/users']);
  }

  private _handleGetUserSuccess(user: User)
  {
    this.user = user;

    this.userForm.setValue({
    name: user.name,
    email: user.email,
    password: "",
    password_confirmation: ""

    });
  }

  private _handleError(error: any) {
    this.snackBar.open(error.json(), null, {
      duration: 2000,
    });
  }

  private _handleTokenError(error: any)
  {
    var config: MatSnackBarConfig = new MatSnackBarConfig();
    config.duration = 1000;
    this.snackBar.open("Su sesión ha expirado.", undefined, config);
    this._router.navigate(['/signin']);
  }
}
