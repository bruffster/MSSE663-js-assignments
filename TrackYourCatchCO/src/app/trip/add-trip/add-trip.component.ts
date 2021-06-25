import { Component, OnInit } from '@angular/core';
import { TripService } from 'src/app/service/trip/trip.service';

import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { OktaAuthService } from '@okta/okta-angular';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css'],
  providers: [ DatePipe ]
})
export class AddTripComponent implements OnInit {

  form!: FormGroup;
  submitted = false;
  data: any;
  // userinfo:any
  uid!: string;
  constructor(
    private tripService: TripService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private datePipe: DatePipe) { }

  async createForm(): Promise<void> {
    this.form = this.formBuilder.group({
      tripName: ['', Validators.required],
      location: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.createForm();
  }

  get f(): any {
    return this.form.controls;
  }

  async insertData(): Promise<any> {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const uidKey = '_uid';
    try {
      this.form.value[uidKey] = JSON.parse(localStorage.getItem('okta-token-storage') || '{}').idToken.claims.sub;
    } catch (error) {
      // console.log(error);
    }

    this.tripService.insertTrip(this.form.value).subscribe(
      (res: any) => {
      this.data = res;
      this.toastr.success(JSON.stringify(this.data.code), JSON.stringify(this.data.message),
      {
        timeOut: 3000,
        progressBar: true,
      });
      this.router.navigateByUrl('/');
      },
      (error: any) => console.log('emited error:', error),
      () => console.log('insert trip complete')
    );
  }
}
