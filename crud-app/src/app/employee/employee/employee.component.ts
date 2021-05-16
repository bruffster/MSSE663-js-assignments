import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/service/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees:any;
  data:any;
  constructor(private employeeService:EmployeeService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getEmployeesData();
  }

  getEmployeesData() {
    this.employeeService.getData().subscribe(res => {
      console.log(res);
      this.employees = res;
    });
  }

  deleteData(id:any) {
    this.employeeService.deleteData(id).subscribe(res => {
      this.data = res;
      this.toastr.error(JSON.stringify(this.data.code), JSON.stringify(this.data.message), {
        timeOut: 3000,
        progressBar: true
      });
      this.getEmployeesData();
    });
  }
}
