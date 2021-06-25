import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatchService {

  constructor(private httpClient: HttpClient) { }

  // Get Catches for a given trip and user
  getCatches(uid: any, tripId: any): any {
    return this.httpClient.get(environment.apiUrl + '/' + uid + '/trips/' + tripId + '/catches');
  }

  // Insert catch for a given trip and user
  insertCatch(uid: any, tripId: any, data: any): any {
    return this.httpClient.post(environment.apiUrl + '/' + uid + '/trips/' + tripId + '/catch/add', data);
  }

  // Delete a catch
  deleteCatch(uid: any, tripId: any, id: any): any {
    return this.httpClient.delete(environment.apiUrl + '/' + uid + '/trips/' + tripId + '/catches/' + id);
  }

  // Get catch
  getCatch(uid: any, tripId: any, id: any): any {
    return this.httpClient.get(environment.apiUrl + '/' + uid + '/trips/' + tripId + '/catches/' + id);
  }

  // Update a catch
  updateCatch(uid: any, tripId: any, id: any, data: any): any {
    return this.httpClient.put(environment.apiUrl + '/' + uid + '/trips/' + tripId + '/catches/edit/' + id, data);
  }

  // Update a catch Location
  updateCatchLocation(uid: any, tripId: any, id: any, data: any): any {
    return this.httpClient.put(environment.apiUrl + '/' + uid + '/trips/' + tripId + '/catches/edit/location/' + id, data);
  }
}
