import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  constructor(private httpClient: HttpClient) { }

  // Get trips data for user
  getTrips(uid: any): any {
    return this.httpClient.get(environment.apiUrl + '/' + uid + '/trips');
  }

  // Add Trip to a given user
  insertTrip(data: any): any {
    return this.httpClient.post(environment.apiUrl + '/trip/add', data);
  }

  // Get trip by the ID in the database
  getTripById(id: any): any {
    return this.httpClient.get(environment.apiUrl + '/trip/' + id);
  }

  // Update trip data
  updateTrip(id: any, data: any): any {
    return this.httpClient.put(environment.apiUrl + '/trip/edit/' + id, data);
  }

  // Delete Trip
  deleteTrip(id: any): any {
    return this.httpClient.delete(environment.apiUrl + '/trip/' + id);
  }

}
