import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRoutes, Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { OKTA_CONFIG, OktaAuthModule, OktaAuthService, OktaAuthGuard } from '@okta/okta-angular';
import { OktaAuthOptions } from '@okta/okta-auth-js';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const oktaConfig: OktaAuthOptions = {
    issuer: 'https://dev-41479669.okta.com/oauth2/default',
    clientId: '0oapny2dw50GFpPsl5d6',
    redirectUri: window.location.origin + '/callback'
  };
  let config: Routes = [
    {
        path: '', component: LoginComponent
    }
  ];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
      ],
      declarations: [ LoginComponent ],
      providers: [HttpClient, HttpHandler,OktaAuthService, OktaAuthGuard, OktaAuthModule, { provide: OKTA_CONFIG, useValue: oktaConfig },provideRoutes(config), {provide: LoginComponent, userClass: LoginComponent}],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});
