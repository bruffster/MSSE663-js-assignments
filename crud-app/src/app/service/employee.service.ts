import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { InjectorInstance } from '../app.module';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private httpClient: HttpClient) { }
  getData() {
    return this.httpClient.get(environment.apiUrl + '/employees');
  }

  insertData(data: any) {
    return this.httpClient.post(environment.apiUrl + '/employee/add', data);
  }

  insertOktaUser(data: any) {
    return this.httpClient.post(environment.apiUrl + '/employee/addOktaUser', data);
  }

  getOktaUser(uid: any) {
    return this.httpClient.get(environment.apiUrl + '/okta/' + uid);
  }

  getDataById(id: any) {
    return this.httpClient.get(environment.apiUrl + '/employee/' + id);
  }

  updateData(id:any, data:any) {
    return this.httpClient.put(environment.apiUrl + '/employee/edit/'+id, data);
  }

  deleteData(id:any) {
    return this.httpClient.delete(environment.apiUrl + '/employee/' +id);
  }
}
