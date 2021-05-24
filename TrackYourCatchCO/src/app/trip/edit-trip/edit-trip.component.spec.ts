import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, ActivatedRouteSnapshot, provideRoutes, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IndividualConfig, ToastrService } from 'ngx-toastr';

import { EditTripComponent } from './edit-trip.component';

describe('EditTripComponent', () => {
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
  let config: Routes = [
    {
        path: '', component: EditTripComponent
    }
  ];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
      ],
      declarations: [ EditTripComponent ],
      providers: [ HttpClient, HttpHandler, {provide: ActivatedRoute, useValue: fakeActivatedRoute}, { provide: ToastrService, useValue: toastrService }, provideRoutes(config)]
    })
    .compileComponents();
  });

  beforeEach(() => {
    EditTripComponent.prototype.ngOnInit = () => {}
    fixture = TestBed.createComponent(EditTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
