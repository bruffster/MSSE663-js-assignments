import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  isAuthenticated = false;
  constructor(public oktaAuth: OktaAuthService) {
    // subscribe to authentication state changes
    try {
      this.oktaAuth.$authenticationState.subscribe(
        (isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated
      );
    }
    catch (error) {}
  }
  async ngOnInit(): Promise<void> {
    // get authentication state for immediate use
    try {
      this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    }
    catch (error) {}
  }

  async logout(): Promise<void> {
    await this.oktaAuth.signOut();
  }

  removeUID(): void {
    localStorage.removeItem('uid');
    console.log('removing uid from local storage');
  }

  async getInfo(): Promise<void> {
    // const accessToken = await this.oktaAuth.getAccessToken();
    if (this.isAuthenticated) {
      try {
        const userinfo = await this.oktaAuth.getUser();
        console.log(userinfo.sub);
      }
      catch (error) {}
    }
    else {
      console.log('user not authenticated!');
    }
  }
}
