import { Component, OnInit } from '@angular/core';
import { TripService } from 'src/app/service/trip.service';
import { ToastrService } from 'ngx-toastr';
import { OktaAuthService } from '@okta/okta-angular';
import { NumberFormatStyle } from '@angular/common';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit {
  employees:any;
  data:any;
  userinfo:any;
  constructor(private employeeService:TripService, private toastr:ToastrService, private oktaAuth: OktaAuthService) { 
  }

  async ngOnInit(): Promise<void> {
    await this.getInfo();
    this.getEmployeesData(this.userinfo.sub);
  }

  async getInfo(): Promise<void> {
    //const accessToken = await this.oktaAuth.getAccessToken();
      const userinfo = await this.oktaAuth.getUser();
      console.log(userinfo.sub);
      this.userinfo = userinfo;

  }

  getEmployeesData(uid:any) {
    console.log("uid:" + uid);
    this.employeeService.getData(uid).subscribe(res => {
      console.log(res);
      this.employees = res;
    });
  }

  deleteData(id:any) {
    this.employeeService.deleteData(id).subscribe(res => {
      this.data = res;
      this.toastr.error(JSON.stringify(this.data.code), JSON.stringify(this.data.message), {
        timeOut: 3000,
        progressBar: true
      });
      this.getEmployeesData(this.userinfo.sub);
    });
  }
}
