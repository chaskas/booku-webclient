import { Component, OnInit } from '@angular/core';

import { PType } from '../../model/ptype';
import { User } from '../../model/user';
import { Router, Params, ActivatedRoute } from '@angular/router';

import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { PTypeService } from '../../services/ptype.service';
import { UserService } from '../../services/user.service';
import { Angular2TokenService } from 'angular2-token';

import { CustomValidators } from 'ng2-validation';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  ptypes: PType[];
  user: User;
  userForm: FormGroup;
  constructor(
    private ptypeService: PTypeService,
    private userService: UserService,
    private _router: Router,
    private route: ActivatedRoute,
    private _tokenService: Angular2TokenService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar

    ) {

    this.user = new User();
    this._tokenService.validateToken().subscribe(
      res =>      this.user.id = this._tokenService.currentUserData.id,
      error =>    this._handleTokenError(error)
    )
    this.ptypeService.getPTypes().then(ptypes => this.handleGetPtypesSuccess(ptypes));



  }

  ngOnInit() {

  


  }

  handleGetPtypesSuccess(ptypes: PType[]){
    this.ptypes = ptypes;
  }

  private createForm()
  {
    this.userForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, CustomValidators.email]],
    password: [''],
    password_confirmation: ['']
    });
  }  

  private _handleGetUserSuccess(user: User)
  {
    this.user = user;

    this.userForm.patchValue({
      name: user.name,
      email: user.email,
      password: user.password,
      password_confirmation: user.password_confirmation

  });
  }
  private _handleTokenError(error: any) {
    var config: MatSnackBarConfig = new MatSnackBarConfig();
    config.duration = 1000;
    this.snackBar.open("Su sesión ha expirado.", undefined, config);
    this._router.navigate(['/signin']);
  }
}
