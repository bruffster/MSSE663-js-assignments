// import {} from 'jasmine';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, provideRoutes, RouterModule, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxLoadingModule } from 'ngx-loading';

import { CatchComponent } from './catch.component';

const catchesTestData = [
  {
      _id: '60ab1fa128b7036eb56fbe2e',
      species: 'Rainbow Trout',
      weight: 3,
      length: 18,
      location: 'Bear River',
      _uid: '00uqkfl9cbeaa0Fq65d6',
      _tripId: '60ab1d5d025a6c62ee2fae3c',
      created_at: '2021-05-24T03:38:09.382Z',
      updated_at: '2021-06-20T20:45:02.556Z',
      lat: 39.8974501,
      lng: -104.78279119999999
  },
  {
      _id: '60cfa86e8f81f27b7cc37c77',
      species: 'Brown Trout',
      weight: 4,
      length: 21,
      location: 'Yampa River',
      _uid: '00uqkfl9cbeaa0Fq65d6',
      _tripId: '60ab1d5d025a6c62ee2fae3c',
      created_at: '2021-06-20T20:43:26.629Z',
      updated_at: '2021-06-20T20:44:52.673Z',
  },
  {
      _id: '60cfa8db8f81f27b7cc37c78',
      species: 'Brook Trout',
      weight: 2,
      length: 14,
      location: 'Bear River',
      _uid: '00uqkfl9cbeaa0Fq65d6',
      _tripId: '60ab1d5d025a6c62ee2fae3c',
      created_at: '2021-06-20T20:45:15.750Z',
      updated_at: '2021-06-20T20:45:26.930Z',
      lat: 39.897441199999996,
      lng: -104.7827835
  }
];

describe('CatchComponent', () => {
  let component: CatchComponent;
  let fixture: ComponentFixture<CatchComponent>;
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
        path: 'trips/:tripId/catches', component: CatchComponent
    }
  ];
  const fakeActivatedRoute = {
    snapshot: { data: {  } }
  } as ActivatedRoute;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
        RouterModule,
        NgxLoadingModule
      ],
      declarations: [ CatchComponent ],
      providers: [
        HttpClient, FormBuilder, { provide: ToastrService, useValue: toastrService },
        provideRoutes(config), {provide: ActivatedRoute, useValue: fakeActivatedRoute}
      ]
    })
    .compileComponents();
  });

  beforeEach(async () => {
    // CatchComponent.prototype.ngOnInit = () => {}
    fixture = TestBed.createComponent(CatchComponent);
    component = fixture.componentInstance;
    await component.ngOnInit;
    component.catches = catchesTestData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should match the test catches data', () => {
    expect(component.catches).toEqual(catchesTestData);
  });

  it('should have a table with 4 rows', () => {
    const tableRows = fixture.nativeElement.querySelectorAll('tr');
    expect(tableRows.length).toBe(4);
  });

  it('should have 6 columns with the titles #, Species, Weight, Length, Location, and Action', () => {
    const tableHeaders = fixture.nativeElement.querySelectorAll('tr')[0];
    expect(tableHeaders.cells[0].innerHTML).toBe('#');
    expect(tableHeaders.cells[1].innerHTML).toBe('Species');
    expect(tableHeaders.cells[2].innerHTML).toBe('Weight (lb)');
    expect(tableHeaders.cells[3].innerHTML).toBe('Length (in)');
    expect(tableHeaders.cells[4].innerHTML).toBe('Location');
    expect(tableHeaders.cells[5].innerHTML).toBe('Action');
  });

  it('should match the data of the first catch row', () => {
    const dataRow1 = fixture.nativeElement.querySelectorAll('tr')[1];
    expect(dataRow1.cells[0].innerHTML).toBe('1');
    expect(dataRow1.cells[1].innerHTML).toBe('Rainbow Trout');
    expect(dataRow1.cells[2].innerHTML).toBe('3');
    expect(dataRow1.cells[3].innerHTML).toBe('18');
    expect(dataRow1.cells[4].innerHTML).toBe('Bear River');
  });

  it('should match the data of the second catch row', () => {
    const dataRow1 = fixture.nativeElement.querySelectorAll('tr')[2];
    expect(dataRow1.cells[0].innerHTML).toBe('2');
    expect(dataRow1.cells[1].innerHTML).toBe('Brown Trout');
    expect(dataRow1.cells[2].innerHTML).toBe('4');
    expect(dataRow1.cells[3].innerHTML).toBe('21');
    expect(dataRow1.cells[4].innerHTML).toBe('Yampa River');
  });

  it('should match the data of the third catch row', () => {
    const dataRow1 = fixture.nativeElement.querySelectorAll('tr')[3];
    expect(dataRow1.cells[0].innerHTML).toBe('3');
    expect(dataRow1.cells[1].innerHTML).toBe('Brook Trout');
    expect(dataRow1.cells[2].innerHTML).toBe('2');
    expect(dataRow1.cells[3].innerHTML).toBe('14');
    expect(dataRow1.cells[4].innerHTML).toBe('Bear River');
  });

  it('should have all of the correct buttons for each catch (Edit, Save GPS, Show Map, Delete)', () => {
    const btns = fixture.nativeElement.querySelectorAll('button');
    const arrLen = component.catches.length;
    for (let i = 0; i < arrLen; i = i + 4) {
      expect(btns[i].innerHTML).toBe('Edit');
      expect(btns[i + 1].innerHTML).toBe('Save GPS');
      expect(btns[i + 2].innerHTML).toBe('Show Map');
      expect(btns[i + 3].innerHTML).toBe('Delete');
    }
  });

  it('should have the Add Catch Button', () => {
    const btns = fixture.nativeElement.querySelectorAll('button');
    expect(btns[btns.length - 1].innerHTML).toBe('Add Catch');
  });

});

