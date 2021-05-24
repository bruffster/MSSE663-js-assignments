import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TripComponent } from './trip/trip/trip.component';
import { NavbarComponent } from './navbar/navbar/navbar.component';

import { HttpClientModule } from '@angular/common/http';
import { AddTripComponent } from './trip/add-trip/add-trip.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditTripComponent } from './trip/edit-trip/edit-trip.component';

import { OKTA_CONFIG, OktaAuthModule } from '@okta/okta-angular';
import { OktaAuthOptions } from '@okta/okta-auth-js';
import { LoginComponent } from './login/login.component';

import { CatchComponent } from './catch/catch/catch.component';
import { EditCatchComponent } from './catch/edit-catch/edit-catch.component';

import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule } from '@angular/material/dialog';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const oktaConfig: OktaAuthOptions = {
  issuer: 'https://dev-41479669.okta.com/oauth2/default',
  clientId: '0oapny2dw50GFpPsl5d6',
  redirectUri: window.location.origin + '/callback'
};


const appRoutes:Routes = [
  {
    path: '', component:TripComponent
  },
  {
    path: 'add-trip', component:AddTripComponent
  },
  {
    path: 'edit/:id', component:EditTripComponent
  },
  {
    path: 'trips/:tripId/catches', component:CatchComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    TripComponent,
    NavbarComponent,
    AddTripComponent,
    EditTripComponent,
    LoginComponent,
    CatchComponent,
    EditCatchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    OktaAuthModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    NgbModule
  ],
  providers: [{ provide: OKTA_CONFIG, useValue: oktaConfig }],
  bootstrap: [AppComponent]
})
export class AppModule {}

