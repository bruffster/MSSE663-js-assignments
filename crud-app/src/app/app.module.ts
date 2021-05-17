import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee/employee.component';
import { NavbarComponent } from './navbar/navbar/navbar.component';

import { HttpClientModule } from '@angular/common/http';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';

import { OKTA_CONFIG, OktaAuthModule } from '@okta/okta-angular';
import { OktaAuthOptions } from '@okta/okta-auth-js';
import { LoginComponent } from './login/login.component';

import {Injector} from '@angular/core';
const oktaConfig: OktaAuthOptions = {
  issuer: 'https://dev-41479669.okta.com/oauth2/default',
  clientId: '0oapny2dw50GFpPsl5d6',
  redirectUri: window.location.origin + '/callback'
};


const appRoutes:Routes = [
  {
    path: '', component:EmployeeComponent
  },
  {
    path: 'add-employee', component:AddEmployeeComponent
  },
  {
    path: 'edit/:id', component:EditEmployeeComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    NavbarComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    LoginComponent,
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
  ],
  providers: [{ provide: OKTA_CONFIG, useValue: oktaConfig }],
  bootstrap: [AppComponent]
})
export class AppModule {   constructor(private injector: Injector) 
  {
    InjectorInstance = this.injector;
  }}
export let InjectorInstance: Injector;

