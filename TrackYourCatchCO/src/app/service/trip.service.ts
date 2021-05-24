import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  constructor(private httpClient: HttpClient) { }
  
  // Get trips data for user
  getTrips(uid:any) {
    console.log("UID in api call: " + uid);
    return this.httpClient.get(environment.apiUrl + '/' + uid + '/trips');
  }

  // Get Catches for a given trip and user
  getCatches(uid:any, tripId:any) {
    console.log("UID in api call: " + uid);
    return this.httpClient.get(environment.apiUrl + '/' + uid + '/trips/' + tripId + '/catches');
  }

  // Add Trip to a given user
  insertTrip(data: any) {
    return this.httpClient.post(environment.apiUrl + '/trip/add', data);
  }

  // Insert catch for a given trip and user
  insertCatch(uid:any, tripId:any, data: any) {
    return this.httpClient.post(environment.apiUrl + '/' + uid + '/trips/' + tripId + '/catch/add', data);
  }

  // insert Okta User data into DB, this check occurs on login, will not add duplicate users
  insertOktaUser(data: any) {
    return this.httpClient.post(environment.apiUrl + '/addOktaUser', data);
  }

  // Gets the okta user from the database
  getOktaUser(uid: any) {
    return this.httpClient.get(environment.apiUrl + '/okta/' + uid);
  }

  // Get trip by the ID in the database
  getTripById(id: any) {
    return this.httpClient.get(environment.apiUrl + '/trip/' + id);
  }

  // Update trip data
  updateTrip(id:any, data:any) {
    return this.httpClient.put(environment.apiUrl + '/trip/edit/'+id, data);
  }

  // Delete Trip
  deleteTrip(id:any) {
    return this.httpClient.delete(environment.apiUrl + '/trip/' +id);
  }

  // Delete a catch
  deleteCatch(uid:any, tripId:any, id:any) {
    console.log('uid: ' + uid + ' tripId: ' + tripId + ' id: ' + id);
    return this.httpClient.delete(environment.apiUrl + '/' + uid + '/trips/' + tripId +'/catches/' + id);
  }

  // Get catch
  getCatch(uid:any, tripId:any, id:any) {
    console.log('APICall: uid: ' + uid + ' tripId: ' + tripId + ' id: ' + id);
    return this.httpClient.get(environment.apiUrl + '/' + uid + '/trips/' + tripId +'/catches/' + id);
  }

  // Update a catch
  updateCatch(uid:any, tripId:any, id:any, data:any) {
    console.log('uid: ' + uid + ' tripId: ' + tripId + ' id: ' + id);
    return this.httpClient.put(environment.apiUrl + '/' + uid + '/trips/' + tripId +'/catches/edit/' + id, data);
  }
}
