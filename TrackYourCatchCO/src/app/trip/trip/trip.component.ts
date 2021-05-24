import { Component, OnInit } from '@angular/core';
import { TripService } from 'src/app/service/trip.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit {
  trips:any;
  data:any;
  
  constructor(private tripService:TripService, private toastr:ToastrService) { 
  }

  async ngOnInit(): Promise<void> {
    this.getTripsData(JSON.parse(localStorage.getItem('okta-token-storage') || '{}').idToken.claims.sub);
  }

  getTripsData(uid:any) {
    this.tripService.getTrips(uid).subscribe(res => {
      console.log(res);
      this.trips = res;
    });
  }

  deleteTrip(id:any) {
    this.tripService.deleteTrip(id).subscribe(res => {
      this.data = res;
      this.toastr.error(JSON.stringify(this.data.code), JSON.stringify(this.data.message), {
        timeOut: 3000,
        progressBar: true
      });
      this.getTripsData(JSON.parse(localStorage.getItem('okta-token-storage') || '{}').idToken.claims.sub);
    });
  }
}
