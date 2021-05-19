import { Component, OnInit } from '@angular/core';
import { TripService } from 'src/app/service/trip.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-catch',
  templateUrl: './catch.component.html',
  styleUrls: ['./catch.component.css']
})
export class CatchComponent implements OnInit {
  catches:any;
  data:any;

  constructor(private tripService:TripService, private toastr:ToastrService) { }

  ngOnInit(): void {
    let uid = JSON.parse(localStorage.getItem('okta-token-storage') || '{}').idToken.claims.sub
    this.getTripsData(uid, '60a40e308632f83b5682b4b5');
  }


  getTripsData(uid:any, tripId:any) {
    this.tripService.getCatches(uid, tripId).subscribe(res => {
      console.log(res);
      this.catches = res;
    });
  }

  deleteData(uid:any, tripId:any, id:any) {
    this.tripService.deleteCatch(uid, tripId, id).subscribe(res => {
      this.data = res;
      this.toastr.error(JSON.stringify(this.data.code), JSON.stringify(this.data.message), {
        timeOut: 3000,
        progressBar: true
      });
      this.getTripsData(JSON.parse(localStorage.getItem('okta-token-storage') || '{}').idToken.claims.sub, '60a40e308632f83b5682b4b5');
    });
  }
}
