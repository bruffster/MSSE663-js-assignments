import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { provideRoutes, Router, RouterModule, Routes } from '@angular/router';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';

import { AddTripComponent } from './add-trip.component';
import { OKTA_CONFIG,OktaAuthService } from '@okta/okta-angular';
import { OktaAuthOptions } from '@okta/okta-auth-js';

describe('AddTripComponent', () => {
  let component: AddTripComponent;
  let fixture: ComponentFixture<AddTripComponent>;

  const toastrService = {
    success: (
      message?: string,
      title?: string,
      override?: Partial<IndividualConfig>
    ) => {},
    error: (
      message?: string,
      title?: string,
      override?: Partial<IndividualConfig>
    ) => {},
  };

  let config: Routes = [
    {
        path: '', component: AddTripComponent
    }
  ];
  const oktaConfig: OktaAuthOptions = {
    issuer: 'https://dev-41479669.okta.com/oauth2/default',
    clientId: '0oapny2dw50GFpPsl5d6',
    redirectUri: window.location.origin + '/callback'
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
      ],
      declarations: [ AddTripComponent ],
      providers: [HttpHandler, HttpClient, FormBuilder,{ provide: ToastrService, useValue: toastrService }, provideRoutes(config), OktaAuthService, { provide: OKTA_CONFIG, useValue: oktaConfig }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

