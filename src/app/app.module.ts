import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Modules
import { RoutingModule } from './modules/routing/routing.module';
import { MaterialModule } from './modules/material/material.module';

//Services
import { ClientService } from './services/client.service';
import { BookingService } from './services/booking.service';

import { PlaceService } from './services/place.service';
import { PTypeService } from './services/ptype.service';
import { DialogsServiceService } from './services/dialogs-service.service';

// Classes
import { AppConfig } from './config/app-config';


// Components
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
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
      RutValidator,
      ClientsDatabase,
      PlaceService,
      DialogsServiceService,
      { provide: LOCALE_ID, useValue: "es-CL" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
