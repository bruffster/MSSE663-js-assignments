import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { OKTA_CONFIG, OktaAuthModule, OktaAuthService, OktaAuthGuard } from '@okta/okta-angular';
import { OktaAuthOptions } from '@okta/okta-auth-js';


describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  const oktaConfig: OktaAuthOptions = {
    issuer: 'https://dev-41479669.okta.com/oauth2/default',
    clientId: '0oapny2dw50GFpPsl5d6',
    redirectUri: window.location.origin + '/callback'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      providers: [OktaAuthService, OktaAuthGuard, OktaAuthModule, { provide: OKTA_CONFIG, useValue: oktaConfig }],
      //imports: [ OktaAuthService, OktaAuthGuard, OktaAuthModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.navbar-brand').textContent).toContain('TrackYourCatchCO');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
