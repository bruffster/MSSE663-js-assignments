import { Component, OnInit } from '@angular/core';
import { TripService } from 'src/app/service/trip.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Catch } from '../../model/models.model';



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
  submitted2=false;
  closeModal!:String;
  closeModal2!:String;
  modal:any;
  catch = new Catch();
  uid:any; 

  constructor(private modalService:NgbModal, private tripService:TripService, private formBuilder: FormBuilder, private toastr: ToastrService, private route:ActivatedRoute, private router:Router) { }

  updateCatchForm = new FormGroup({
    species: new FormControl('', Validators.required),
    length: new FormControl('', Validators.required),
    weight: new FormControl('', Validators.required),
    location: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.uid = JSON.parse(localStorage.getItem('okta-token-storage') || '{}').idToken.claims.sub;
    this.tripId = this.route.snapshot.params.tripId;
    this.createForm();
    this.getTripsData(this.uid, this.tripId);
  }

  get f() {
    return this.form.controls;
  }

  get f1() {
    return this.updateCatchForm.controls;
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
      this.submitted = false;
      //this.resetFormData(this.form, this.submitted);
    });
  }

  deleteCatch(uid:any, tripId:any, id:any) {
    this.tripService.deleteCatch(uid, tripId, id).subscribe(res => {
      this.data = res;
      this.toastr.error(JSON.stringify(this.data.code), JSON.stringify(this.data.message), {
        timeOut: 3000,
        progressBar: true
      });
      this.getTripsData(this.uid, this.tripId);
    });
  }

  triggerModal(content:any, ariaLbl:String) {
    this.modalService.open(content, {ariaLabelledBy: ariaLbl.toString()}).result.then((res) => {
      this.closeModal2 = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal2 = `Dismissed ${this.getDismissReason(res)}`;
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

  getCatchData(id:any) {
    this.tripService.getCatch(this.uid, this.tripId, id).subscribe(res => {
      this.data = res;
      this.catch = this.data;
      console.log(this.catch);
      this.updateCatchForm = new FormGroup({
        species: new FormControl(this.catch.species, Validators.required),
        length: new FormControl(this.catch.length, [Validators.required]),
        weight: new FormControl(this.catch.weight, Validators.required),
        location: new FormControl(this.catch.location, Validators.required)
      });
    });
  }

  updateCatchData(id:any) {
    this.submitted2 = true;

    if(this.updateCatchForm.invalid) {
      return;
    }

    this.tripService.updateCatch(this.uid, this.tripId, id, this.updateCatchForm.value).subscribe(res => {
      this.data = res;
      this.toastr.success(JSON.stringify(this.data.code), JSON.stringify(this.data.message), {
        timeOut: 3000,
        progressBar: true,
      });

      this.getTripsData(this.uid, this.tripId);
      this.submitted2 = false;
      this.updateCatchForm.reset();
        });
  }
}
