import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Angular2TokenService } from 'angular2-token';


import { registerLocaleData } from '@angular/common';
import localeESCL from '@angular/common/locales/es-CL';

registerLocaleData(localeESCL);

// Modules
import { RoutingModule } from './modules/routing/routing.module';
import { MaterialModule } from './modules/material/material.module';

//Services
import { ClientService } from './services/client.service';
import { BookingService } from './services/booking.service';
import { UserService } from './services/user.service';
import { PlaceService } from './services/place.service';
import { PTypeService } from './services/ptype.service';
import { SessionService } from './services/session.service';
import { PaymentService } from './services/payment.service';
import { StatusService } from './services/status.service';
import { DialogsServiceService } from './services/dialogs-service.service';

// Classes
import { AppConfig } from './config/app-config';

// Components

import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';

// Components - Clients
import { ListComponent } from './components/clients/list/list.component';
import { DetailComponent } from './components/clients/detail/detail.component';
import { NewComponent } from './components/clients/new/new.component';
import { EditComponent } from './components/clients/edit/edit.component';

// Components - Agenda
import { AgendaDailyComponent } from './components/agenda/agenda-daily/agenda-daily.component';
import { AgendaHourlyComponent } from './components/agenda/agenda-hourly/agenda-hourly.component';

// Components - Place
import { PlaceNewComponent } from './components/place/place-new/place-new.component';
import { PlaceEditComponent } from './components/place/place-edit/place-edit.component';
import { PlaceDetailComponent } from './components/place/place-detail/place-detail.component';
import { PlaceListComponent } from './components/place/place-list/place-list.component';

// Components - PType
import { PtypeNewComponent } from './components/ptype/ptype-new/ptype-new.component';
import { PtypeEditComponent } from './components/ptype/ptype-edit/ptype-edit.component';
import { PtypeDetailComponent } from './components/ptype/ptype-detail/ptype-detail.component';
import { PtypeListComponent } from './components/ptype/ptype-list/ptype-list.component';

// Components - Sessions
import { LoginComponent } from './components/session/login/login.component';
import { LogoutComponent } from './components/session/logout/logout.component';

// Components - Booking
import { BookingNewComponent } from './components/booking/booking-new/booking-new.component';
import { BookingShowComponent } from './components/booking/booking-show/booking-show.component';
import { BookingEditComponent } from './components/booking/booking-edit/booking-edit.component';
import { BookingClientEditComponent } from './components/booking/booking-client-edit/booking-client-edit.component';

// Components - Dialogs
import { DialogComponent } from './utils/dialog/dialog.component';
import { PaymentNewComponent } from './components/payment/payment-new/payment-new.component';

// Components - Users
import { UserNewComponent } from './components/user/user-new/user-new.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { UserListComponent } from './components/user/user-list/user-list.component';

// Validators
import { CustomValidators } from 'ng2-validation';
import { Ng2Rut, RutValidator } from './utils/rut/ng2-rut.module';

// Databases
import { ClientsDatabase } from './components/clients/list/clients-database';
import { PTypesDatabase } from './components/ptype/ptype-list/ptypes-database';
import { PlacesDatabase } from './components/place/place-list/places-database';
import { StatusesDatabase } from './components/status/status-list/statuses-database';
import { UsersDatabase } from './components/user/user-list/users-database';

import { PaymentsDatabase } from './components/booking/booking-show/payments-database';
import { StatusNewComponent } from './components/status/status-new/status-new.component';
import { StatusEditComponent } from './components/status/status-edit/status-edit.component';
import { StatusListComponent } from './components/status/status-list/status-list.component';
import { StatusDetailComponent } from './components/status/status-detail/status-detail.component';



@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    ListComponent,
    DetailComponent,
    NewComponent,
    EditComponent,
    DialogComponent,
    AgendaDailyComponent,
    AgendaHourlyComponent,
    PtypeNewComponent,
    PtypeEditComponent,
    PtypeDetailComponent,
    PtypeListComponent,
    PlaceNewComponent,
    PlaceEditComponent,
    PlaceDetailComponent,
    PlaceListComponent,
    LoginComponent,
    LogoutComponent,
    BookingNewComponent,
    BookingShowComponent,
    PaymentNewComponent,
    BookingEditComponent,
    StatusNewComponent,
    StatusEditComponent,
    StatusListComponent,
    StatusDetailComponent,
    BookingClientEditComponent,
    UserNewComponent,
    UserEditComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule, RoutingModule, MaterialModule, RouterModule, FormsModule, HttpModule, ReactiveFormsModule, HttpClientModule
  ],
  entryComponents: [DialogComponent, PaymentNewComponent, BookingEditComponent, BookingClientEditComponent],
  providers: [
      AppConfig,
      ClientService,
      BookingService,
      PTypeService,
      PlaceService,
      UserService,
      RutValidator,
      PaymentService,
      ClientsDatabase,
      PTypesDatabase,
      PlacesDatabase,
      UsersDatabase,
      StatusesDatabase,
      StatusService,
      PaymentsDatabase,
      DialogsServiceService,
      Angular2TokenService,
      SessionService,
      { provide: LOCALE_ID, useValue: "es-CL" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
