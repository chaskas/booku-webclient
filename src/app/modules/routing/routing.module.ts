import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';


// const routes: Routes = [
//  {  path: '', component: DashboardComponent ,
//       children:[
//         { path: '', component: CalendarComponent },
//         { path: 'members/new', component: MemberNewComponent, canActivate: [Angular2TokenService] },
//         { path: 'members/:type', component: MemberListComponent, canActivate: [Angular2TokenService] },
//         { path: 'members/edit/:id', component: MemberEditComponent, canActivate: [Angular2TokenService] },
//         { path: 'members/show/:id', component: MemberShowComponent, canActivate: [Angular2TokenService] },
//         { path: 'events/show/:id', component: EventShowComponent, canActivate: [Angular2TokenService] },
//         { path: 'users', component: UsersListComponent, canActivate: [Angular2TokenService] },
//         { path: 'users/new', component: RegisterComponent, canActivate: [Angular2TokenService] },
//
//       ]
//  },
//  { path: 'signin', component: LoginComponent },
//  { path: 'signout', component: LogoutComponent, canActivate: [Angular2TokenService] }
// ];

@NgModule({
  imports: [
    CommonModule,
    // RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class RoutingModule { }
