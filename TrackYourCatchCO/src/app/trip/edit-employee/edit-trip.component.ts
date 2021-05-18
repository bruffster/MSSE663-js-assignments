import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../../model/employee.model';
import { TripService } from '../../service/trip.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})
export class EditTripComponent implements OnInit {
  employee = new Employee();
  id:any;
  data:any;
  submitted=false;
  constructor(private employeeService:TripService, private route: ActivatedRoute, private toastr:ToastrService, private router: Router) { }

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    salary: new FormControl('', Validators.required)
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
        name: new FormControl(this.employee.name, Validators.required),
        email: new FormControl(this.employee.email, [Validators.required, Validators.email]),
        salary: new FormControl(this.employee.salary, Validators.required)
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
