import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { OktaAuthService } from '@okta/okta-angular';
import { Tokens } from '@okta/okta-auth-js';
import OktaSignIn from '@okta/okta-signin-widget';
import { AppComponent } from '../app.component';


const DEFAULT_ORIGINAL_URI = window.location.origin;



@Component({
  selector: 'app-login',
  template: `
    <div id="okta-signin-container"></div>`,
  styles: []
})


export class LoginComponent implements OnInit {
  widget = new OktaSignIn({
    baseUrl: 'https://dev-41479669.okta.com',
    clientId: '0oapny2dw50GFpPsl5d6',
    redirectUri: 'http://localhost:4200/callback',
    registration: {
      parseSchema: function(schema: any, onSuccess: (arg0: any) => void, onFailure: any) {
         // handle parseSchema callback
         onSuccess(schema);
      },
      preSubmit: function (postData: any, onSuccess: (arg0: any, arg1: any) => void, onFailure: any) {
         // handle preSubmit callback
         var error = {
          "errorSummary": "Custom form level error"
        };
        //onFailure(error);
        console.log(postData);
        onSuccess(postData, console.log(postData));
      },
      postSubmit: function (response: any, onSuccess: (arg0: any, arg1: any) => void, onFailure: any) {
          // handle postsubmit callback
          console.log("response " + response);
         onSuccess(response, console.log("postSubmit successful"));
         var error = {
          "errorSummary": "Custom form level error"
        };
        //onFailure(error);
      }
    },
    features: {
      // Used to enable registration feature on the widget.
      // https://github.com/okta/okta-signin-widget#feature-flags
       registration: true // REQUIRED
    }
  });

  constructor(private oktaAuth: OktaAuthService, router: Router) {
    // Show the widget when prompted, otherwise remove it from the DOM.
    router.events.forEach(event => {
      if (event instanceof NavigationStart) {
        switch (event.url) {
          case '/login':
          case '/calculator':
            break;
          default:
            this.widget.remove();
            break;
        }
      }
    });
  }

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
    }).catch((err: any) => {
      // Typically due to misconfiguration
      throw err;
    });
  }


}