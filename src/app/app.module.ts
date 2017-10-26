import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Angular2TokenService } from 'angular2-token';

// Modules
import { RoutingModule } from './modules/routing/routing.module';
import { MaterialModule } from './modules/material/material.module';

//Services
import { ClientService } from './services/client.service';
import { BookingService } from './services/booking.service';

import { PlaceService } from './services/place.service';
import { PTypeService } from './services/ptype.service';
import { SessionService } from './services/session.service';
import { DialogsServiceService } from './services/dialogs-service.service';

// Classes
import { AppConfig } from './config/app-config';

// Components

import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
  //Clients
import { ListComponent } from './components/clients/list/list.component';
import { DetailComponent } from './components/clients/detail/detail.component';
import { NewComponent } from './components/clients/new/new.component';
import { EditComponent } from './components/clients/edit/edit.component';
import { AgendaMonthlyComponent } from './components/agenda/agenda-monthly/agenda-monthly.component';
import { DialogComponent } from './utils/dialog/dialog.component';

// Validators
import { CustomValidators } from 'ng2-validation';
import { Ng2Rut, RutValidator } from './utils/rut/ng2-rut.module';


import { ClientsDatabase } from './components/clients/list/clients-database';
import { PTypesDatabase } from './components/ptype/ptype-list/ptypes-database';
import { PlacesDatabase } from './components/place/place-list/places-database';

import { LoginComponent } from './components/session/login/login.component';
import { LogoutComponent } from './components/session/logout/logout.component';
import { RegisterComponent } from './components/session/register/register.component';



@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    ListComponent,
    DetailComponent,
    NewComponent,
    EditComponent,
    DialogComponent,
    AgendaMonthlyComponent

  ],
  imports: [
    BrowserModule, RoutingModule, MaterialModule, RouterModule, FormsModule, HttpModule, ReactiveFormsModule
  ],
  entryComponents: [DialogComponent],
  providers: [
      AppConfig,
      ClientService,
      BookingService,
      PTypeService,
      PlaceService,
      RutValidator,
      ClientsDatabase,
      PTypesDatabase,
      PlacesDatabase,
      DialogsServiceService,
      Angular2TokenService,
      SessionService,
      { provide: LOCALE_ID, useValue: "es-CL" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
