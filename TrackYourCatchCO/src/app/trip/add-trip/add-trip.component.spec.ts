import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideRoutes, Routes } from '@angular/router';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';

import { AddTripComponent } from './add-trip.component';
import { OKTA_CONFIG } from '@okta/okta-angular';
import { OktaAuthOptions } from '@okta/okta-auth-js';

describe('AddTripComponent', () => {

  const tripNameKey = 'tripName';
  const locationKey = 'location';
  const dateKey = 'date';
  const requiredKey = 'required';

  const testTripData = {
    created_at: '2021-05-23T23:59:18.977Z',
    date: '2021-05-29T00:00:00.000Z',
    location: 'Yampa',
    tripName: 'Yampa',
    updated_at: '2021-05-23T23:59:18.977Z',
    _id: '60aaec56b96ccb51925c7f55',
    _uid: '00uqkfl9cbeaa0Fq65d6'
  };

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

  const config: Routes = [
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
    await localStorage.setItem('okta-token-storage', '{{"idToken":{"claims":{"sub":"00uqkfl9cbeaa0Fq65d6"},},}}');
  });

  beforeEach(() => {
    localStorage.setItem('okta-token-storage', '{{"idToken":{"claims":{"sub":"00uqkfl9cbeaa0Fq65d6"},},}}');
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        ReactiveFormsModule
      ],
      declarations: [ AddTripComponent ],
      providers: [
        HttpHandler,
        HttpClient,
        FormBuilder,
        { provide: ToastrService, useValue: toastrService },
        provideRoutes(config),
        { provide: OKTA_CONFIG,
          useValue: oktaConfig }
        ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    localStorage.setItem('okta-token-storage', '{{"idToken":{"claims":{"sub":"00uqkfl9cbeaa0Fq65d6"},},}}');
    fixture = TestBed.createComponent(AddTripComponent);
    component = fixture.componentInstance;
    const fb = new FormBuilder();
    component.form = fb.group({
      tripName: ['', Validators.required],
      location: ['', Validators.required],
      date: ['', Validators.required],
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Validation tests', () => {
    it('trip name field validity', () => {
      const tripName = component.form.controls[tripNameKey];
      expect(tripName.valid).toBeFalsy();
    });

    it('location field validity', () => {
      const location = component.form.controls[locationKey];
      expect(location.valid).toBeFalsy();
    });

    it('date field validity', () => {
      const date = component.form.controls[dateKey];
      expect(date.valid).toBeFalsy();
    });
  });

  describe('Error tests', () => {
    it('trip name errors', () => {
      const tripName = component.form.controls[tripNameKey];
      const errors = tripName.errors || {};
      expect(errors[requiredKey]).toBeTruthy();
    });

    it('location errors', () => {
      const location = component.form.controls[locationKey];
      const errors = location.errors || {};
      expect(errors[requiredKey]).toBeTruthy();
    });

    it('date errors', () => {
      const date = component.form.controls[dateKey];
      const errors = date.errors || {};
      expect(errors[requiredKey]).toBeTruthy();
    });
  });

  describe('Fix validation and error tests', () => {
    it('trip name fix validation and errors', () => {
      const tripName = component.form.controls[tripNameKey];
      tripName.setValue('Yampa');
      const errors = tripName.errors || {};
      expect(errors[requiredKey]).toBeFalsy();
      expect(tripName.valid).toBeTruthy();
    });

    it('location fix validation and errors', () => {
      const location = component.form.controls[locationKey];
      location.setValue('Yampa');
      const errors = location.errors || {};
      expect(errors[requiredKey]).toBeFalsy();
      expect(location.valid).toBeTruthy();
    });

    it('date fix validation and errors', () => {
      const date = component.form.controls[dateKey];
      date.setValue('2021-05-29T00:00:00.000Z');
      const errors = date.errors || {};
      expect(errors[requiredKey]).toBeFalsy();
      expect(date.valid).toBeTruthy();
    });
  });
});

