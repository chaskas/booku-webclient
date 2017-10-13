import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from '../../components/layout/layout.component';
//Clients
import { NewComponent } from '../../components/clients/new/new.component';
import { ListComponent } from '../../components/clients/list/list.component';
import { DetailComponent } from '../../components/clients/detail/detail.component';
import { EditComponent } from '../../components/clients/edit/edit.component';
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


 const routes: Routes = [
  {  path: '', component: LayoutComponent,
       children:[
         //Clients
         { path: 'clients/new', component: NewComponent },
         { path: 'clients/detail/:id', component: DetailComponent },
         { path: 'clients/edit/:id', component: EditComponent },
         { path: 'clients', component: ListComponent },
         //PType
         { path: 'ptype/new', component: PtypeNewComponent },
         { path: 'ptype/list', component: PtypeListComponent },
         { path: 'ptype/edit/:id', component: PtypeEditComponent },
         { path: 'ptype/detail/:id', component: PtypeDetailComponent },
         //Place
         { path: 'place/new', component: PlaceNewComponent },
         { path: 'place/edit/:id', component: PlaceEditComponent },
         { path: 'place/list', component: PlaceListComponent },
         { path: 'place/detail/:id', component: PlaceDetailComponent }
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
