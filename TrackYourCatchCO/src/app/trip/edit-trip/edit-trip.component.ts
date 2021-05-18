import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employee, Trip} from '../../model/models.model';
import { TripService } from '../../service/trip.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})
export class EditTripComponent implements OnInit {
  employee = new Trip();
  id:any;
  data:any;
  submitted=false;
  constructor(private employeeService:TripService, private route: ActivatedRoute, private toastr:ToastrService, private router: Router) { }

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
    return this.form.controls;
  }

  getData() {
    this.employeeService.getDataById(this.id).subscribe(res => {
      this.data = res;
      this.employee = this.data;
      this.form = new FormGroup({
        tripName: new FormControl(this.employee.tripName, Validators.required),
        location: new FormControl(this.employee.location, [Validators.required]),
        date: new FormControl(this.employee.date, Validators.required)
      });
    });
  }

  updateData() {
    this.submitted = true;

    if(this.form.invalid) {
      return;
    }
    this.employeeService.updateData(this.id, this.form.value).subscribe(res => {
      this.data = res;
      this.toastr.success(JSON.stringify(this.data.code), JSON.stringify(this.data.message), {
        timeOut: 3000,
        progressBar: true,
      });
      this.router.navigateByUrl('/');
    });
  }
}
 