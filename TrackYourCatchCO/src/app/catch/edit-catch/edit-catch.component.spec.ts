import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCatchComponent } from './edit-catch.component';

describe('EditCatchComponent', () => {
  let component: EditCatchComponent;
  let fixture: ComponentFixture<EditCatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
