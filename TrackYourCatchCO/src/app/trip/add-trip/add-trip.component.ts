import { Component, OnInit } from '@angular/core';
import { TripService } from 'src/app/service/trip.service';

import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})
export class AddTripComponent implements OnInit {

  form!: FormGroup;
  submitted=false;
  data:any;
  //userinfo:any
  uid!:String
  constructor(private tripService:TripService, private formBuilder: FormBuilder, private toastr: ToastrService, private router: Router) { }

  async createForm() {
    this.form = this.formBuilder.group({
      tripName: ['', Validators.required],
      location: ['', Validators.required],
      date: ['', Validators.required],
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

    if(this.form.invalid) {
      return;
    }

    try {
      this.form.value['_uid'] = JSON.parse(localStorage.getItem('okta-token-storage') || '{}').idToken.claims.sub;
    } catch (error) {
      //console.log(error);
    }
    this.tripService.insertTrip(this.form.value).subscribe(res => {
      this.data = res;
      this.toastr.success(JSON.stringify(this.data.code), JSON.stringify(this.data.message),
      {
        timeOut: 3000,
        progressBar: true,
      });
      this.router.navigateByUrl('/');
    });
  }
}
