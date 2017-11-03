import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';

import { LayoutComponent } from '../../components/layout/layout.component';
//Clients
import { NewComponent } from '../../components/clients/new/new.component';
import { ListComponent } from '../../components/clients/list/list.component';
import { DetailComponent } from '../../components/clients/detail/detail.component';
import { EditComponent } from '../../components/clients/edit/edit.component';
import { AgendaMonthlyComponent } from '../../components/agenda/agenda-monthly/agenda-monthly.component';

//Ptypes
import { PtypeNewComponent } from '../../components/ptype/ptype-new/ptype-new.component';
import { PtypeListComponent } from '../../components/ptype/ptype-list/ptype-list.component';
import { PtypeDetailComponent } from '../../components/ptype/ptype-detail/ptype-detail.component';
import { PtypeEditComponent } from '../../components/ptype/ptype-edit/ptype-edit.component';
//Places
import { PlaceNewComponent } from '../../components/place/place-new/place-new.component';
import { PlaceListComponent } from '../../components/place/place-list/place-list.component';
import { PlaceEditComponent } from '../../components/place/place-edit/place-edit.component';
import { PlaceDetailComponent } from '../../components/place/place-detail/place-detail.component';

import { LoginComponent } from '../../components/session/login/login.component';
import { RegisterComponent } from '../../components/session/register/register.component';
import { LogoutComponent } from '../../components/session/logout/logout.component';


// Booking
import { BookingNewComponent } from '../../components/booking/booking-new/booking-new.component';
import { BookingShowComponent } from '../../components/booking/booking-show/booking-show.component';

 const routes: Routes = [
  {  path: '', component: LayoutComponent,
      children:[
         //Clients
         { path: 'clients/new', component: NewComponent, canActivate: [Angular2TokenService] },
         { path: 'clients/detail/:id', component: DetailComponent, canActivate: [Angular2TokenService] },
         { path: 'clients/edit/:id', component: EditComponent, canActivate: [Angular2TokenService] },
         { path: 'clients', component: ListComponent, canActivate: [Angular2TokenService] },
         //PType
         { path: 'ptype/new', component: PtypeNewComponent, canActivate: [Angular2TokenService] },
         { path: 'ptype/list', component: PtypeListComponent, canActivate: [Angular2TokenService] },
         { path: 'ptype/edit/:id', component: PtypeEditComponent, canActivate: [Angular2TokenService] },
         { path: 'ptype/detail/:id', component: PtypeDetailComponent, canActivate: [Angular2TokenService] },
         //Place
         { path: 'place/new', component: PlaceNewComponent, canActivate: [Angular2TokenService] },
         { path: 'place/edit/:id', component: PlaceEditComponent, canActivate: [Angular2TokenService] },
         { path: 'place/list', component: PlaceListComponent, canActivate: [Angular2TokenService] },
         { path: 'place/detail/:id', component: PlaceDetailComponent, canActivate: [Angular2TokenService] },
         
         // Agenda
         { path: 'agenda/monthly/:ptype', component: AgendaMonthlyComponent, canActivate: [Angular2TokenService] },
         // Booking
         { path: 'booking/new', component: BookingNewComponent, canActivate: [Angular2TokenService] },
         { path: 'booking/:id', component: BookingShowComponent, canActivate: [Angular2TokenService] }
       ]
  },
  { path: 'signin', component: LoginComponent },
  { path: 'signout', component: LogoutComponent, canActivate: [Angular2TokenService] }
 ];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class RoutingModule { }
