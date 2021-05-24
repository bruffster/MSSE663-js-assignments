import { HttpClient, HttpHandler } from '@angular/common/http';
import { InjectionToken } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TOAST_CONFIG, IndividualConfig, ToastrService } from 'ngx-toastr';

import { TripComponent } from './trip.component';

describe('TripComponent', () => {
  let component: TripComponent;
  let fixture: ComponentFixture<TripComponent>;
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
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripComponent ],
      providers: [ HttpClient, HttpHandler, { provide: ToastrService, useValue: toastrService }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
