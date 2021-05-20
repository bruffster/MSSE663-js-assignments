import { Component, OnInit } from '@angular/core';
import { TripService } from 'src/app/service/trip.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-catch',
  templateUrl: './catch.component.html',
  styleUrls: ['./catch.component.css']
})
export class CatchComponent implements OnInit {
  catches:any;
  data:any;
  tripId:any;
  form!:any;
  submitted=false;
  closeModal!:String;
  modal:any;
  uid = JSON.parse(localStorage.getItem('okta-token-storage') || '{}').idToken.claims.sub;

  constructor(private modalService:NgbModal, private tripService:TripService, private formBuilder: FormBuilder, private toastr: ToastrService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.tripId = this.route.snapshot.params.tripId;
    this.createForm();
    this.getTripsData(this.uid, this.tripId);
  }

  get f() {
    return this.form.controls;
  }

  getTripsData(uid:any, tripId:any) {
    this.tripService.getCatches(uid, tripId).subscribe(res => {
      console.log(res);
      this.catches = res;
    });
  }

  async createForm() {
    this.form = this.formBuilder.group({
      species: ['', Validators.required],
      weight: ['', Validators.required],
      length: ['', Validators.required],
      location: ['', Validators.required]
    });
  }

  async insertCatch() {
    this.submitted = true;

    if(this.form.invalid) {
      return;
    }

    this.form.value['_uid'] = this.uid;
    this.form.value['_tripId'] = this.tripId;
    this.tripService.insertCatch(this.uid, this.tripId,this.form.value).subscribe(res => {
      this.data = res;
      this.toastr.success(JSON.stringify(this.data.code), JSON.stringify(this.data.message),
      {
        timeOut: 3000,
        progressBar: true,
      });
      
      this.getTripsData(this.uid, this.tripId);
      this.form.reset();
      this.submitted =false;
    });
  }

  deleteData(uid:any, tripId:any, id:any) {
    this.tripService.deleteCatch(uid, tripId, id).subscribe(res => {
      this.data = res;
      this.toastr.error(JSON.stringify(this.data.code), JSON.stringify(this.data.message), {
        timeOut: 3000,
        progressBar: true
      });
      this.getTripsData(this.uid, this.tripId);
    });
  }

  triggerModal(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
