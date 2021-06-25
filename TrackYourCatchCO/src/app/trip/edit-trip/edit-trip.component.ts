import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Trip } from '../../model/models.model';
import { TripService } from '../../service/trip/trip.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css'],
  providers: [ DatePipe]
})
export class EditTripComponent implements OnInit {
  trip = new Trip();
  id!: string;
  data: any;
  submitted = false;
  constructor(
    private tripService: TripService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private datePipe: DatePipe) { }

  form = new FormGroup({
    tripName: new FormControl('', Validators.required),
    location: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.getData();
  }

  get f(): any {
    return this.form.controls;
  }

  getData(): void {
    this.tripService.getTripById(this.id).subscribe(
      (res: any) => {
        this.data = res;
        this.trip = this.data;
        this.form = new FormGroup({
          tripName: new FormControl(this.trip.tripName, Validators.required),
          location: new FormControl(this.trip.location, [Validators.required]),
          date: new FormControl(this.datePipe.transform(this.trip.date.split('T')[0], 'yyyy-MM-dd'), Validators.required)
        });
      },
      (error: any) => console.log('emited error:', error),
      () => console.log('get trip complete')
    );
  }

  updateTrip(): any {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.tripService.updateTrip(this.id, this.form.value).subscribe(
      (res: any) => {
        this.data = res;

        this.toastr.success(JSON.stringify(this.data.code), JSON.stringify(this.data.message), {
          timeOut: 3000,
          progressBar: true,
        });

        this.router.navigateByUrl('/');
      },
      (error: any) => console.log('emited error:', error),
      () => console.log('update trip complete')
    );
  }
}
