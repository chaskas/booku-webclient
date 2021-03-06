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
import { AgendaDailyComponent } from '../../components/agenda/agenda-daily/agenda-daily.component';
import { AgendaHourlyComponent } from '../../components/agenda/agenda-hourly/agenda-hourly.component';

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
import { LogoutComponent } from '../../components/session/logout/logout.component';

// Booking
import { BookingNewComponent } from '../../components/booking/booking-new/booking-new.component';
import { BookingShowComponent } from '../../components/booking/booking-show/booking-show.component';

//Status
import { StatusNewComponent } from '../../components/status/status-new/status-new.component';
import { StatusEditComponent } from '../../components/status/status-edit/status-edit.component';
import { StatusListComponent } from '../../components/status/status-list/status-list.component';
import { StatusDetailComponent } from '../../components/status/status-detail/status-detail.component';

//Users
import { UserNewComponent } from '../../components/user/user-new/user-new.component';
import { UserEditComponent } from '../../components/user/user-edit/user-edit.component';
import { UserListComponent } from '../../components/user/user-list/user-list.component';
// import { UserDetailComponent } from '../../components/user/user-detail/user-detail.component';

 const routes: Routes = [
  {  path: '', component: LayoutComponent,
      children:[
        // Root
        { path: '', component: AgendaDailyComponent },

         //Clients
         { path: 'clients/new', component: NewComponent, canActivate: [Angular2TokenService] },
         { path: 'clients/detail/:id', component: DetailComponent, canActivate: [Angular2TokenService] },
         { path: 'clients/edit/:id', component: EditComponent, canActivate: [Angular2TokenService] },
         { path: 'clients', component: ListComponent, canActivate: [Angular2TokenService] },

         //PType
         { path: 'ptypes/new', component: PtypeNewComponent, canActivate: [Angular2TokenService] },
         { path: 'ptypes', component: PtypeListComponent, canActivate: [Angular2TokenService] },
         { path: 'ptypes/edit/:id', component: PtypeEditComponent, canActivate: [Angular2TokenService] },
         { path: 'ptypes/detail/:id', component: PtypeDetailComponent, canActivate: [Angular2TokenService] },

         //Place
         { path: 'places/new', component: PlaceNewComponent, canActivate: [Angular2TokenService] },
         { path: 'places/edit/:id', component: PlaceEditComponent, canActivate: [Angular2TokenService] },
         { path: 'places', component: PlaceListComponent, canActivate: [Angular2TokenService] },
         { path: 'places/detail/:id', component: PlaceDetailComponent, canActivate: [Angular2TokenService] },

         // Agenda
         { path: 'agenda/daily/:ptype', component: AgendaDailyComponent, canActivate: [Angular2TokenService] },
         { path: 'agenda/hourly/:ptype', component: AgendaHourlyComponent, canActivate: [Angular2TokenService] },

         // Booking
         { path: 'booking/new', component: BookingNewComponent, canActivate: [Angular2TokenService] },
         { path: 'booking/:id', component: BookingShowComponent, canActivate: [Angular2TokenService] },

         //Status
         { path: 'statuses/new', component: StatusNewComponent, canActivate: [Angular2TokenService] },
         { path: 'statuses/list', component: StatusListComponent, canActivate: [Angular2TokenService] },
         { path: 'statuses/edit/:id', component: StatusEditComponent, canActivate: [Angular2TokenService] },
         { path: 'statuses/detail/:id', component: StatusDetailComponent, canActivate: [Angular2TokenService] },

         //User
         { path: 'users/new', component: UserNewComponent, canActivate: [Angular2TokenService] },
         { path: 'users', component: UserListComponent, canActivate: [Angular2TokenService] },
         { path: 'users/edit/:id', component: UserEditComponent, canActivate: [Angular2TokenService] },
        //  { path: 'users/show/:id', component: UserDetailComponent, canActivate: [Angular2TokenService] },
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
