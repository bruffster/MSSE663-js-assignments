import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  // insert Okta User data into DB, this check occurs on login, will not add duplicate users
  insertOktaUser(data: any): any {
    return this.httpClient.post(environment.apiUrl + '/addOktaUser', data);
  }

  // Gets the okta user from the database
  getOktaUser(uid: any): any {
    return this.httpClient.get(environment.apiUrl + '/okta/' + uid);
  }
}
