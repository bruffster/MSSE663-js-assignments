import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Trip } from '../../model/models.model';
import { TripService } from '../../service/trip.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})
export class EditTripComponent implements OnInit {
  trip = new Trip();
  id:any;
  data:any;
  submitted=false;
  constructor(private tripService:TripService, private route: ActivatedRoute, private toastr:ToastrService, private router: Router) { }

  form = new FormGroup({
    tripName: new FormControl('', Validators.required),
    location: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.getData();
  }

  get f() {
    console.log(this.form.controls)
    return this.form.controls;
  }

  getData() {
    this.tripService.getTripById(this.id).subscribe(res => {
      this.data = res;
      this.trip = this.data;
      this.form = new FormGroup({
        tripName: new FormControl(this.trip.tripName, Validators.required),
        location: new FormControl(this.trip.location, [Validators.required]),
        date: new FormControl(this.trip.date, Validators.required)
      });
    });
  }

  updateTrip() {
    this.submitted = true;

    if(this.form.invalid) {
      return;
    }

    this.tripService.updateTrip(this.id, this.form.value).subscribe(res => {
      this.data = res;
      
      this.toastr.success(JSON.stringify(this.data.code), JSON.stringify(this.data.message), {
        timeOut: 3000,
        progressBar: true,
      });

      this.router.navigateByUrl('/');
    });
  }
}
 