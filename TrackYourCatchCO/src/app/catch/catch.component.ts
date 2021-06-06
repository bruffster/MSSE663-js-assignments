import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TripService } from 'src/app/service/trip.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Catch } from '../model/models.model';
import { LoaderComponent } from '../loader/loader.component';  
import { GoogleMapsModule } from '@angular/google-maps';
import { Observable } from 'rxjs';




@Component({
  selector: 'app-catch',
  templateUrl: './catch.component.html',
  styleUrls: ['./catch.component.css']
})
export class CatchComponent implements OnInit {
  catches:any;
  data:any;
  tripId!:String;
  form!:FormGroup;
  submitted=false;
  submitted2=false;
  closeModal!:String;
  catch = new Catch();
  uid!:String; 
  isLoading = false;
  lat!:number;
  lng!:number;

  constructor(private modalService:NgbModal, private tripService:TripService, private formBuilder: FormBuilder, private toastr: ToastrService, private route:ActivatedRoute, private router:Router) { }
  
  @ViewChild('mapContainer', { static: false }) gmap!: ElementRef;
  map!: google.maps.Map;



  mapInitializer() {
    let coordinates = new google.maps.LatLng(this.lat, this.lng);

    let mapOptions: google.maps.MapOptions = {
     center: coordinates,
     zoom: 8
    };
  
    let marker = new google.maps.Marker({
      position: coordinates,
      map: this.map,
    });
    this.map = new google.maps.Map(this.gmap.nativeElement, 
    mapOptions);
    marker.setMap(this.map);
  }

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

  getTripsData(uid:String, tripId:String) {
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
    });
  }

  deleteCatch(uid:String, tripId:String, id:String) {
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

  getCatchData(uid:String, tripId:String, id:String) {
    this.tripService.getCatch(uid, tripId, id).subscribe(res => {
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

  // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition


  getLocation() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function success(pos){
          let coord = pos.coords;
          console.log('Your current position is:');
          console.log(`Latitude : ${coord.latitude}`);
          console.log(`Longitude: ${coord.longitude}`);
          console.log(`More or less ${coord.accuracy} meters.`);
          alert('Location accessed')
        },
        function error(err){
          console.warn(`ERROR(${err.code}): ${err.message}`);
          alert('User not allowed')
        },
        {timeout:10000}
      );
    } else {
      console.log('Geolocation not supported');
    }
  }


  getPosition(): Promise<any>
  {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {

          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
          console.log(resp.coords);
        },
        err => {
          reject(err);
        });
    });

  }

  setCoord() {
    this.getPosition().then(pos => {
      this.lat = pos.lat;
      this.lng = pos.lng;
      console.log(this.lat);
      console.log(this.lng);
      this.mapInitializer();
    });
    
  }



}
