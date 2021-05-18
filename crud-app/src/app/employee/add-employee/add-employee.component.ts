import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/service/employee.service';

import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  form!: FormGroup;
  submitted=false;
  data:any;
  userinfo:any
  uid:any
  constructor(private employeeService:EmployeeService, private formBuilder: FormBuilder, private toastr: ToastrService, private router: Router, private oktaAuth:OktaAuthService) { }

  async createForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      salary: ['', Validators.required],
    });
  }
  
  ngOnInit(){
    this.createForm();
  }

  get f() {
    return this.form.controls;
  }

  async insertData() {
    this.submitted = true;
    await this.getInfo(()=> {
      console.log('callback');
    })
    if(this.form.invalid) {
      return;
    }
    console.log(this.form.value);
    let newNum = "_uid";
    this.form.value[newNum] = this.uid;
    console.log(this.form.value);
    this.employeeService.insertData(this.form.value).subscribe(res => {
      console.log('json check');
      console.log(this.form.value);
      this.data = res;
      this.toastr.success(JSON.stringify(this.data.code), JSON.stringify(this.data.message),
      {
        timeOut: 3000,
        progressBar: true,
      });
      this.router.navigateByUrl('/');
    });
  }

  async getInfo(_callback:any): Promise<void> {
    //const accessToken = await this.oktaAuth.getAccessToken();
      const userinfo = await this.oktaAuth.getUser();
      console.log(userinfo.sub);
      this.userinfo = userinfo;
      this.uid = userinfo.sub;
      console.log(this.uid);
      _callback(this.uid = userinfo.sub);
      this.uid = userinfo.sub
  }
}

