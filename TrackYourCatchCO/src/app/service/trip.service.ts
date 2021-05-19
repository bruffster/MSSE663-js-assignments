import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { InjectorInstance } from '../app.module';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  constructor(private httpClient: HttpClient) { }
  
  getData(uid:any) {
    console.log("UID in api call: " + uid);
    return this.httpClient.get(environment.apiUrl + '/' + uid + '/trips');
  }

  insertData(data: any) {
    return this.httpClient.post(environment.apiUrl + '/trip/add', data);
  }

  insertOktaUser(data: any) {
    return this.httpClient.post(environment.apiUrl + '/addOktaUser', data);
  }

  getOktaUser(uid: any) {
    return this.httpClient.get(environment.apiUrl + '/okta/' + uid);
  }

  getDataById(id: any) {
    return this.httpClient.get(environment.apiUrl + '/trip/' + id);
  }

  updateData(id:any, data:any) {
    return this.httpClient.put(environment.apiUrl + '/trip/edit/'+id, data);
  }

  deleteData(id:any) {
    return this.httpClient.delete(environment.apiUrl + '/trip/' +id);
  }
}
