import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  isAuthenticated = false;
  constructor(public oktaAuth: OktaAuthService) {
    // subscribe to authentication state changes
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated
    );
  }
  async ngOnInit(): Promise<void> {
    // get authentication state for immediate use
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
  }

  async logout(): Promise<void> {
    await this.oktaAuth.signOut();
  }

  async getInfo(): Promise<void> {
    //const accessToken = await this.oktaAuth.getAccessToken();
    if(this.isAuthenticated) {
      const userinfo = await this.oktaAuth.getUser();
      console.log(userinfo.sub);
    }
    else {
      console.log("user not authenticated!");
    }
  }
}

