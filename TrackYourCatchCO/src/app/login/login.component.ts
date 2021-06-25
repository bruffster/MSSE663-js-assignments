/*
 * The source code and instruction to implement the Okta Auth and sign-in-widget came from the following source:
 * https://developer.okta.com/blog/2019/02/12/secure-angular-login
 * The example was altered and update to work for my angular project.
 * Okta provides a lot of examples on how to setup their authentication
 * with your angular projects.  Currently the Okta app settings are
 * configured to work with localhost and port 4200 for the angular application.
 * Should this application change ports, or run as a live website, the signin
 * and signout redirects would need updated to account for this.
 */

import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { OktaAuthService } from '@okta/okta-angular';
import { Tokens } from '@okta/okta-auth-js';
import OktaSignIn from '@okta/okta-signin-widget';
import { OktaUser } from '../model/models.model';
import { UserService } from '../service/user/user.service';

const DEFAULT_ORIGINAL_URI = window.location.origin;

@Component({
  selector: 'app-login',
  template: `
    <div id="okta-signin-container"></div>`,
  styles: []
})


export class LoginComponent implements OnInit {
  data: any;
  user: any;
  oktaUser = new OktaUser();
  constructor(private oktaAuth: OktaAuthService, router: Router, private userService: UserService) {
    // Show the widget when prompted, otherwise remove it from the DOM.
    router.events.forEach(event => {
      if (event instanceof NavigationStart) {
        switch (event.url) {
          case '/login':
          case '/add-trip':
          case '':
          case '/':
          case '/home':
            break;
          default:
            this.widget.remove();
            break;
        }
      }
    });
  }

  widget = new OktaSignIn({
    baseUrl: 'https://dev-41479669.okta.com',
    clientId: '0oapny2dw50GFpPsl5d6',
    redirectUri: 'http://localhost:4200/callback',
    registration: {
      parseSchema: (schema: any, onSuccess: (arg0: any) => void, onFailure: any) => {
        // handle parseSchema callback
        onSuccess(schema);
      },
      preSubmit: (postData: any, onSuccess: (arg0: any) => void, onFailure: any) => {
        // handle preSubmit callback
        onSuccess(postData);
      },
      postSubmit: (response: any, onSuccess: (arg0: any) => void, onFailure: any) => {
        // handle postsubmit callback
        onSuccess(response);
      }
    },
    features: {
      // Used to enable registration feature on the widget.
      // https://github.com/okta/okta-signin-widget#feature-flags
       registration: true // REQUIRED
    }
  });

  ngOnInit(): void {
    this.widget.showSignInToGetTokens({
      el: '#okta-signin-container'
    }).then(async (tokens: Tokens | undefined) => {
      const originalUri = this.oktaAuth.getOriginalUri();
      if (originalUri === DEFAULT_ORIGINAL_URI) {
        this.oktaAuth.setOriginalUri('/');
      }

      // Remove the widget
      this.widget.remove();

      // In this flow the redirect to Okta occurs in a hidden iframe
      await this.oktaAuth.handleLoginRedirect(tokens);
      const userData = {email: (await this.oktaAuth.getUser()).email, uid: (await this.oktaAuth.getUser()).sub};

      await this.userService.getOktaUser(userData.uid).subscribe(
        (res: any) => {
          this.user = res;
          this.oktaUser = this.user;
          if (!this.oktaUser) {
            console.log('user not found, adding new user');
            this.userService.insertOktaUser(userData).subscribe(
              (res1: any) => {
                this.data = res1;
              },
              (error: any) => console.log('emited error:', error),
              () => console.log('insert oktauser complete')
            );
          } else {
            console.log('user found, bypassing user add');
            console.log(this.oktaUser);
          }
          const userId = JSON.parse(localStorage.getItem('okta-token-storage') || '{}').idToken.claims.sub;
        },
        (error: any) => console.log('emited error:', error),
        () => console.log('oktauser complete')
      );

    }).catch((err: any) => {
      // Typically due to misconfiguration
      throw err;
    });

  }
}
