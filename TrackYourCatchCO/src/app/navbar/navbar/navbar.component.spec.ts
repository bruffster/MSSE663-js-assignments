import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { OKTA_CONFIG, OktaAuthModule, OktaAuthService, OktaAuthGuard } from '@okta/okta-angular';
import { OktaAuthOptions } from '@okta/okta-auth-js';
import { By } from '@angular/platform-browser';
import { provideRoutes, RouterModule, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

const config: Routes = [
  {
      path: '', component: NavbarComponent
  }
];
describe('NavbarComponent', () => {
  localStorage.setItem('okta-token-storage', '{{"idToken":{"claims":{"sub":"00uqkfl9cbeaa0Fq65d6"},},}}');
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  const oktaConfig: OktaAuthOptions = {
    issuer: 'https://dev-41479669.okta.com/oauth2/default',
    clientId: '0oapny2dw50GFpPsl5d6',
    redirectUri: window.location.origin + '/callback'
  };
  beforeEach(async () => {
    await localStorage.setItem('okta-token-storage', '{{"idToken":{"claims":{"sub":"00uqkfl9cbeaa0Fq65d6"},},}}');
  });
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        RouterModule
      ],
      declarations: [ NavbarComponent ],
      providers: [OktaAuthService, OktaAuthGuard, OktaAuthModule, { provide: OKTA_CONFIG, useValue: oktaConfig }, provideRoutes(config)],
      // imports: [ OktaAuthService, OktaAuthGuard, OktaAuthModule ]
    })
    .compileComponents();
  });



  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    // component.isAuthenticated = true;
    fixture.detectChanges();
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.navbar-brand').textContent).toContain('TrackYourCatchCO');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the Home button', () => {
    const links = fixture.debugElement.queryAll(By.css('.nav-item'));
    expect(links[0].nativeNode.innerText).toBe('Home');
  });

  it('should have the Add Trip button', () => {
    const links = fixture.debugElement.queryAll(By.css('.nav-item'));
    expect(links[1].nativeNode.innerText).toBe('Add Trip');
  });

  it('should have the Login button', () => {
    const links = fixture.debugElement.queryAll(By.css('.nav-item'));
    expect(links[2].nativeNode.innerText).toBe('Login');
  });


  describe('logged in', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(NavbarComponent);
      component = fixture.componentInstance;
      component.isAuthenticated = true;
      fixture.detectChanges();
    });
    it('should have the Logout button', () => {
      component.isAuthenticated = true;
      const links = fixture.debugElement.queryAll(By.css('.nav-item'));
      expect(links[3].nativeNode.innerText).toBe('Logout');
    });
  });

});
