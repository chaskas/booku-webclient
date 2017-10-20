import { Component, Input, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Angular2TokenService } from 'angular2-token';
import { CustomValidators } from 'ng2-validation';

import { SessionService } from '../../../services/session.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(


  ) { }

  ngOnInit() {
  }

}
