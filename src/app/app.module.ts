import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import { LOCALE_ID } from '@angular/core';

// Modules
import { RoutingModule } from './modules/routing/routing.module';
import { MaterialModule } from './modules/material/material.module';

// Classes
import { AppConfig } from './config/app-config';

// Components
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, RoutingModule, MaterialModule
  ],
  providers: [
      AppConfig,
      { provide: LOCALE_ID, useValue: "es-CL" }],
  bootstrap: [AppComponent]
})
export class AppModule { }
