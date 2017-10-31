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
import { PlaceService } from './services/place.service';
import { PTypeService } from './services/ptype.service';
import { SessionService } from './services/session.service';
import { DialogsServiceService } from './services/dialogs-service.service';
// Classes
import { AppConfig } from './config/app-config';

// Components 
import { DialogComponent } from './utils/dialog/dialog.component';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
  //Clients
import { ListComponent } from './components/clients/list/list.component';
import { DetailComponent } from './components/clients/detail/detail.component';
import { NewComponent } from './components/clients/new/new.component';
import { EditComponent } from './components/clients/edit/edit.component';
  //Places
import { PlaceNewComponent } from './components/place/place-new/place-new.component';
import { PlaceEditComponent } from './components/place/place-edit/place-edit.component';
import { PlaceListComponent } from './components/place/place-list/place-list.component';
import { PlaceDetailComponent } from './components/place/place-detail/place-detail.component';
  //PTypes
import { PtypeListComponent } from './components/ptype/ptype-list/ptype-list.component';
import { PtypeNewComponent } from './components/ptype/ptype-new/ptype-new.component';
import { PtypeEditComponent } from './components/ptype/ptype-edit/ptype-edit.component';
import { PtypeDetailComponent } from './components/ptype/ptype-detail/ptype-detail.component';

import { CustomValidators } from 'ng2-validation';
import { Ng2Rut, RutValidator } from './utils/rut/ng2-rut.module';


import { ClientsDatabase } from './components/clients/list/clients-database';
import { PTypesDatabase } from './components/ptype/ptype-list/ptypes-database';
import { PlacesDatabase } from './components/place/place-list/places-database';

import { LoginComponent } from './components/session/login/login.component';
import { LogoutComponent } from './components/session/logout/logout.component';
import { RegisterComponent } from './components/session/register/register.component';
import { BookingNewComponent } from './components/booking/booking-new/booking-new.component';



@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    ListComponent,
    DetailComponent,
    NewComponent,
    EditComponent,
    DialogComponent,
    PlaceNewComponent,
    PlaceEditComponent,
    PlaceListComponent,
    PlaceDetailComponent,
    PtypeListComponent,
    PtypeNewComponent,
    PtypeEditComponent,
    PtypeDetailComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    BookingNewComponent

  ],
  imports: [
    BrowserModule, RoutingModule, MaterialModule, RouterModule, FormsModule, HttpModule, ReactiveFormsModule
  ],
  entryComponents: [DialogComponent],
  providers: [
      AppConfig,
      ClientService,
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
