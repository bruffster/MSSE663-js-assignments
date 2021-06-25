import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRoutes, RouterModule, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IndividualConfig, ToastrService } from 'ngx-toastr';

import { TripComponent } from './trip.component';
localStorage.setItem('okta-token-storage', '{{"idToken":{"claims":{"sub":"00uqkfl9cbeaa0Fq65d6"},},}}');
describe('TripComponent', () => {

  const testTripData = {
    created_at: '2021-05-23T23:59:18.977Z',
    date: '2021-05-29T00:00:00.000Z',
    location: 'Yampa',
    tripName: 'Yampa',
    updated_at: '2021-05-23T23:59:18.977Z',
    _id: '60aaec56b96ccb51925c7f55',
    _uid: '00uqkfl9cbeaa0Fq65d6'
  };

  const config: Routes = [
    {
        path: '', component: TripComponent
    }
  ];

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
    await localStorage.setItem('okta-token-storage', '{{"idToken":{"claims":{"sub":"00uqkfl9cbeaa0Fq65d6"},},}}');
  });

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterModule, RouterTestingModule.withRoutes([])],
      declarations: [ TripComponent ],
      providers: [ HttpClient, HttpHandler, { provide: ToastrService, useValue: toastrService }, provideRoutes(config)]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripComponent);
    component = fixture.componentInstance;
    component.trips = [testTripData];
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should match the test trip data', () => {
    expect(component.trips[0]).toEqual(testTripData);
  });

  it('should have a table with 2 rows', () => {
    const tableRows = fixture.nativeElement.querySelectorAll('tr');
    expect(tableRows.length).toBe(2);
  });

  it('should have 5 columns with the titles #, Trip Name, Location, Date, and Action', () => {
    const tableHeaders = fixture.nativeElement.querySelectorAll('tr')[0];
    expect(tableHeaders.cells[0].innerHTML).toBe('#');
    expect(tableHeaders.cells[1].innerHTML).toBe('Trip Name');
    expect(tableHeaders.cells[2].innerHTML).toBe('Location');
    expect(tableHeaders.cells[3].innerHTML).toBe('Date');
    expect(tableHeaders.cells[4].innerHTML).toBe('Action');
  });

  it('should have 1 data row with matching data', () => {
    const dataRow = fixture.nativeElement.querySelectorAll('tr')[1];
    expect(dataRow.cells[0].innerHTML).toBe('1');
    expect(dataRow.cells[1].innerHTML).toBe('Yampa');
    expect(dataRow.cells[2].innerHTML).toBe('Yampa');
    expect(dataRow.cells[3].innerHTML).toBe('Saturday, May 29, 2021');
  });
});
