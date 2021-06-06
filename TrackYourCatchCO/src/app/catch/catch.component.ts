import { AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TripService } from 'src/app/service/trip.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Catch, Settings } from '../model/models.model';
import { GoogleMapsModule } from '@angular/google-maps';
import { Observable } from 'rxjs';
import { ngxLoadingAnimationTypes } from 'ngx-loading';

const PrimaryWhite = '#ffffff';
const SecondaryGrey = '#ccc';

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
  lat!:number;
  lng!:number;
  angular: any;
  googleapikey!: String;
  settingsdata:any;
  locationdata:any;
  coordinate:any;
  //https://www.npmjs.com/package/ngx-loading
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;
  public primaryColour = PrimaryWhite;
  public secondaryColour = SecondaryGrey;
  public coloursEnabled = false;
  public loadingTemplate!: TemplateRef<any>;
  public config = { animationType: ngxLoadingAnimationTypes.none, primaryColour: this.primaryColour, secondaryColour: this.secondaryColour, tertiaryColour: this.primaryColour, backdropBorderRadius: '3px' };
  public show:boolean = false;

  constructor(private modalService:NgbModal, private tripService:TripService, private formBuilder: FormBuilder, private toastr: ToastrService, private route:ActivatedRoute, private router:Router) { }
  
  @ViewChild('mapContainer', { static: false }) gmap!: ElementRef;
  map!: google.maps.Map;



  async mapInitializer(uid:String, tripId:String, id:String) {
    this.show = true;
    await this.getCatchLocation(uid, tripId, id);

    if(this.catch.lat != null && this.catch.lat != "" && this.catch.lng != null && this.catch.lng != ""){
      let coordinates = new google.maps.LatLng(this.catch.lat, this.catch.lng);

      let mapOptions: google.maps.MapOptions = {
       center: coordinates,
       zoom: 16,
       mapTypeId:google.maps.MapTypeId.TERRAIN,
       mapTypeControl: true,
       mapTypeControlOptions: {
         style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
        }
      };
    
      let marker = new google.maps.Marker({
        position: coordinates,
        map: this.map,
        label: this.catch.species,
      });
      this.map = new google.maps.Map(this.gmap.nativeElement, 
      mapOptions);
      marker.setMap(this.map);
    }
    else {
      this.show = false;
      this.toastr.error('Error', 'Catch has not been geolocated!',
      {
        timeOut: 3000,
        progressBar: true,
      });
    }
  }

  updateCatchForm = new FormGroup({
    species: new FormControl('', Validators.required),
    length: new FormControl('', Validators.required),
    weight: new FormControl('', Validators.required),
    location: new FormControl('', [Validators.required]),
  });

  async ngOnInit(): Promise<void> {
    await this.getSettings();
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://maps.googleapis.com/maps/api/js?key=" + this.googleapikey;
    document.head.appendChild(script);
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

   async getSettings() {
    this.settingsdata = await this.tripService.getSettings().toPromise();
    this.googleapikey = JSON.stringify(this.settingsdata.googleapikey).replace(/['"]+/g, '');
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

  async getCatchLocation(uid:String, tripId:String, id:String) {
    this.locationdata = await this.tripService.getCatch(uid, tripId, id).toPromise();
    this.catch = this.locationdata;
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

  async updateCatchLocationData(id:any) {
    await this.getCoord();
    this.tripService.updateCatchLocation(this.uid, this.tripId, id, this.coordinate).subscribe(res => {
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
  getPosition(): Promise<any>
  {
    this.show = false;
    this.loading = true;
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {

          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
          console.log(resp.coords);
          this.loading = false;
        },
        err => {
          this.loading = false;
          reject(err);
        });
    });

  }
  async getCoord() {
    await this.getPosition().then(pos => {
      this.coordinate = {lat: pos.lat, lng: pos.lng};
    });
    
  }
}
