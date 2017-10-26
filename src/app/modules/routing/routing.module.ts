import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from '../../components/layout/layout.component';
import { NewComponent } from '../../components/clients/new/new.component';
import { ListComponent } from '../../components/clients/list/list.component';
import { DetailComponent } from '../../components/clients/detail/detail.component';
import { EditComponent } from '../../components/clients/edit/edit.component';
import { AgendaMonthlyComponent } from '../../components/agenda/agenda-monthly/agenda-monthly.component';


 const routes: Routes = [
  {  path: '', component: LayoutComponent,
      children:[
      //         { path: '', component: CalendarComponent },
      //         { path: 'members/new', component: MemberNewComponent, canActivate: [Angular2TokenService] },
      //         { path: 'members/:type', component: MemberListComponent, canActivate: [Angular2TokenService] },
      //         { path: 'members/edit/:id', component: MemberEditComponent, canActivate: [Angular2TokenService] },
      //         { path: 'members/show/:id', component: MemberShowComponent, canActivate: [Angular2TokenService] },
      //         { path: 'events/show/:id', component: EventShowComponent, canActivate: [Angular2TokenService] },
       { path: 'clients/new', component: NewComponent },
       { path: 'clients/detail/:id', component: DetailComponent },
       { path: 'clients/edit/:id', component: EditComponent },
       { path: 'clients', component: ListComponent },
       { path: 'agenda/monthly/:ptype', component: AgendaMonthlyComponent }
//
       ]
  },
//  { path: 'signin', component: LoginComponent },
//  { path: 'signout', component: LogoutComponent, canActivate: [Angular2TokenService] }
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
