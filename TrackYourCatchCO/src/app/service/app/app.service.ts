import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient: HttpClient) { }

  // Get settings
  getSettings(): any {
    return this.httpClient.get(environment.apiUrl + '/settings/');
  }
}
