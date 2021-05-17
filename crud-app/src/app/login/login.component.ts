import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { OktaAuthService } from '@okta/okta-angular';
import { Tokens } from '@okta/okta-auth-js';
import OktaSignIn from '@okta/okta-signin-widget';
import { OktaUser } from '../model/employee.model';
import { EmployeeService } from '../service/employee.service';

const DEFAULT_ORIGINAL_URI = window.location.origin;

@Component({
  selector: 'app-login',
  template: `
    <div id="okta-signin-container"></div>`,
  styles: []
})


export class LoginComponent implements OnInit {
  data:any;
  user:any;
  oktaUser1 = new OktaUser();
  constructor(private oktaAuth: OktaAuthService, router: Router, private employeeService:EmployeeService) {
    // Show the widget when prompted, otherwise remove it from the DOM.
    router.events.forEach(event => {
      if (event instanceof NavigationStart) {
        switch (event.url) {
          case '/login':
          case '/add-employee':
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
      parseSchema: function(schema: any, onSuccess: (arg0: any) => void, onFailure: any) {
         // handle parseSchema callback
         onSuccess(schema);
      },
      preSubmit: function (postData: any, onSuccess: (arg0: any) => void, onFailure: any) {
         // handle preSubmit callback
         var error = {
          "errorSummary": "Custom form level error"
        };
        //onFailure(error);
        onSuccess(postData,);
      },
      postSubmit: function (response: any, onSuccess: (arg0: any) => void, onFailure: any) {
          // handle postsubmit callback
         onSuccess(response);
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
      let newData = {'email': (await this.oktaAuth.getUser()).email, 'uid':(await this.oktaAuth.getUser()).sub};


      await this.employeeService.getOktaUser(newData.uid).subscribe(res => {
        this.user = res;
        this.oktaUser1 = this.user;
        if (!this.oktaUser1) {
          console.log("user not found, adding new user");
          this.employeeService.insertOktaUser(newData).subscribe(res => {
            this.data = res;
          });
        } else {
          console.log("user found, bypassing user add");
          console.log(this.oktaUser1);
        }

      });

    }).catch((err: any) => {
      // Typically due to misconfiguration
      throw err;
    });

  }
}
