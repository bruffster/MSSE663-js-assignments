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

  getCatches(uid:any, tripId:any) {
    console.log("UID in api call: " + uid);
    return this.httpClient.get(environment.apiUrl + '/' + uid + '/trips/' + tripId + '/catches');
  }

  insertData(data: any) {
    return this.httpClient.post(environment.apiUrl + '/trip/add', data);
  }

  insertCatch(uid:any, tripId:any, data: any) {
    return this.httpClient.post(environment.apiUrl + '/' + uid + '/trips/' + tripId + '/catch/add', data);
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

  deleteCatch(uid:any, tripId:any, id:any) {
    console.log('uid: ' + uid + ' tripId: ' + tripId + ' id: ' + id);
    return this.httpClient.delete(environment.apiUrl + '/' + uid + '/trips/' + tripId +'/catches/' + id);
  }

  getCatch(uid:any, tripId:any, id:any) {
    console.log('APICall: uid: ' + uid + ' tripId: ' + tripId + ' id: ' + id);
    return this.httpClient.get(environment.apiUrl + '/' + uid + '/trips/' + tripId +'/catches/' + id);
  }

  updateCatch(uid:any, tripId:any, id:any, data:any) {
    console.log('uid: ' + uid + ' tripId: ' + tripId + ' id: ' + id);
    return this.httpClient.put(environment.apiUrl + '/' + uid + '/trips/' + tripId +'/catches/edit/' + id, data);
  }
}
