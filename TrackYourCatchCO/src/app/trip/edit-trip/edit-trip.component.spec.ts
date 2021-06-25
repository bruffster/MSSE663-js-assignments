import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, provideRoutes, RouterModule, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IndividualConfig, ToastrService } from 'ngx-toastr';

import { EditTripComponent } from './edit-trip.component';

describe('EditTripComponent', () => {

  const testTripData = {
    created_at: '2021-05-23T23:59:18.977Z',
    date: '2021-05-29T00:00:00.000Z',
    location: 'Yampa',
    tripName: 'Yampa',
    updated_at: '2021-05-23T23:59:18.977Z',
    id: '60aaec56b96ccb51925c7f55',
    uid: '00uqkfl9cbeaa0Fq65d6'
  };

  let component: EditTripComponent;
  let fixture: ComponentFixture<EditTripComponent>;
  const fakeActivatedRoute = {
    snapshot: { data: {  } }
  } as ActivatedRoute;
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
        path: '', component: EditTripComponent
    }
  ];
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        ReactiveFormsModule,
        RouterModule
      ],
      declarations: [ EditTripComponent ],
      providers: [
        HttpClient,
        HttpHandler,
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: ToastrService, useValue: toastrService },
        provideRoutes(config)
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    EditTripComponent.prototype.ngOnInit = () => {};
    fixture = TestBed.createComponent(EditTripComponent);
    component = fixture.componentInstance;
    component.trip = testTripData;
    component.form = new FormGroup({
      tripName: new FormControl(component.trip.tripName, Validators.required),
      location: new FormControl(component.trip.location, [Validators.required]),
      date: new FormControl(component.trip.date, Validators.required)
    });
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should match the test trip data', () => {
    expect(component.trip).toEqual(testTripData);
  });

  it('should have correct input fields', () => {
    const compiled = fixture.debugElement.nativeElement;
    const tripNameInput = compiled.querySelector('input[formControlName="tripName"]');
    const tripLocationInput = compiled.querySelector('input[formControlName="location"]');
    const tripDateInput = compiled.querySelector('input[formControlName="date"]');
    expect(tripNameInput).toBeTruthy();
    expect(tripLocationInput).toBeTruthy();
    expect(tripDateInput).toBeTruthy();
  });

  it('trip name field validity', () => {
    const tripNameKey = 'tripName';
    const tripName = component.form.controls[tripNameKey];
    expect(tripName.valid).toBeTruthy();
  });

  it('location field validity', () => {
    const locationKey = 'location';
    const location = component.form.controls[locationKey];
    expect(location.valid).toBeTruthy();
  });

  it('date field validity', () => {
    const dateKey = 'date';
    const date = component.form.controls[dateKey];
    expect(date.valid).toBeTruthy();
  });

  it('should have the correct data', () => {
    const compiled = fixture.debugElement.nativeElement;
    const tripNameKey = 'tripName';
    const tripName = component.form.controls[tripNameKey];
    const tripLocationInput = compiled.querySelector('input[formControlName="location"]');
    const tripDateInput = compiled.querySelector('input[formControlName="date"]');
    expect(tripName.value).toEqual(testTripData.tripName);
    expect(tripLocationInput).toBeTruthy();
    expect(tripDateInput).toBeTruthy();
  });
});
