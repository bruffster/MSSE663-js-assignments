import { Component, OnInit } from '@angular/core';
import { TripService } from 'src/app/service/trip/trip.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})

export class TripComponent implements OnInit {
  trips: any;
  data: any;
  deleteTripSubscription!: Subscription;
  getTripSubscription!: Subscription;

  constructor(private tripService: TripService, private toastr: ToastrService) {
  }

  async ngOnInit(): Promise<void> {
    try {
      await this.getTripsData(JSON.parse(localStorage.getItem('okta-token-storage') || '{}').idToken.claims.sub);
    } catch (error) {
      // console.error(error);
    }
  }

  getTripsData(uid: string): void {
    this.tripService.getTrips(uid).subscribe(
      (res: any) => {
        console.log(res);
        this.trips = res;
      },
      (error: any) => console.log('emited error:', error),
      () => console.log('getting trips complete')
    );
  }

  deleteTrip(id: string): void {
    this.deleteTripSubscription = this.tripService.deleteTrip(id).subscribe(
      (res: any) => {
        this.data = res;
        this.toastr.error(JSON.stringify(this.data.code), JSON.stringify(this.data.message), {
          timeOut: 3000,
          progressBar: true
        });
        try {
          this.getTripsData(JSON.parse(localStorage.getItem('okta-token-storage') || '{}').idToken.claims.sub);
        } catch (error) {
          // console.error(error);
        }
      },
      (error: any) => console.log('emited error:', error),
      () => console.log('deleting trip complete')
    );
  }
}
