import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Catch } from '../model/models.model';
import { GoogleMapsModule } from '@angular/google-maps'; // this shows unused but is necessary
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { CatchService } from '../service/catch/catch.service';
import { AppService } from '../service/app/app.service';

const PrimaryWhite = '#ffffff';
const SecondaryGrey = '#ccc';

@Component({
  selector: 'app-catch',
  templateUrl: './catch.component.html',
  styleUrls: ['./catch.component.css']
})
export class CatchComponent implements OnInit {
  catches: any;
  data: any;
  tripId!: string;
  form!: FormGroup;
  submitted = false;
  submitted2 = false;
  closeModal!: string;
  catch = new Catch();
  uid!: string;
  lat!: number;
  lng!: number;
  angular: any;
  googleapikey!: string;
  settingsdata: any;
  locationdata: any;
  coordinate: any;
  prevMapId!: string;

  updateCatchForm = new FormGroup({
    species: new FormControl('', Validators.required),
    length: new FormControl('', Validators.required),
    weight: new FormControl('', Validators.required),
    location: new FormControl('', [Validators.required]),
    lat: new FormControl([null]),
    lng: new FormControl([null])
  });

  // https://www.npmjs.com/package/ngx-loading
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;
  public primaryColour = PrimaryWhite;
  public secondaryColour = SecondaryGrey;
  public coloursEnabled = false;
  public loadingTemplate!: TemplateRef<any>;
  public config = {
    animationType: ngxLoadingAnimationTypes.none,
    primaryColour: this.primaryColour,
    secondaryColour: this.secondaryColour,
    tertiaryColour: this.primaryColour,
    backdropBorderRadius: '3px'
  };
  public show = false;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private catchService: CatchService,
    private appService: AppService
    ) { }

  @ViewChild('mapContainer', { static: false }) gmap!: ElementRef;
  map!: google.maps.Map;

  async ngOnInit(): Promise<void> {
    await this.getSettings();
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.googleapikey;
    document.head.appendChild(script);
    try {
      this.uid = JSON.parse(localStorage.getItem('okta-token-storage') || '{}').idToken.claims.sub;
    } catch (error) {
      // console.log(error);
    }

    this.tripId = this.route.snapshot.params.tripId;
    this.createForm();
    this.getCatches(this.uid, this.tripId);
  }

  async mapInitializer(uid: string, tripId: string, id: string): Promise<any> {
    if (id !== this.prevMapId && this.prevMapId !== null && this.prevMapId !== '') {
      this.show = false;
      const btnPrev = document.getElementById('btn_' + this.prevMapId);
      if (btnPrev !== null) {
        btnPrev.innerHTML = 'Show Map';
      }
    }

    this.prevMapId = id;
    if (this.show === false) {
      this.show = true;
      await this.getCatchLocation(uid, tripId, id);

      if (this.catch.lat !== null && this.catch.lat !== '' && this.catch.lng !== null && this.catch.lng !== ''){
        const btn = document.getElementById('btn_' + id);
        if (btn !== null) {
          btn.innerHTML = 'Hide Map';
        }

        const coordinates = new google.maps.LatLng(this.catch.lat, this.catch.lng);

        const mapOptions: google.maps.MapOptions = {
         center: coordinates,
         zoom: 16,
         mapTypeId: google.maps.MapTypeId.TERRAIN,
         mapTypeControl: true,
         mapTypeControlOptions: {
           style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
          }
        };

        const marker = new google.maps.Marker({
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
    } else {
      const btn = document.getElementById('btn_' + id);
      if (btn !== null) {
        btn.innerHTML = 'Show Map';
      }

      this.show = false;
    }

  }

  get f(): any {
    return this.form.controls;
  }

  get f1(): any {
    return this.updateCatchForm.controls;
  }

   async getSettings(): Promise<void> {
    this.settingsdata = await this.appService.getSettings().toPromise();
    this.googleapikey = JSON.stringify(this.settingsdata.googleapikey).replace(/['"]+/g, '');
  }

  getCatches(uid: string, tripId: string): void {
    this.catchService.getCatches(uid, tripId).subscribe(
      (res: any) => {
        console.log(res);
        this.catches = res;
      },
      (error: any) => console.log('emited error:', error),
      () => console.log('get trip data complete')
    );
  }

  async createForm(): Promise<void> {
    this.form = this.formBuilder.group({
      species: ['', Validators.required],
      weight: ['', Validators.required],
      length: ['', Validators.required],
      location: ['', Validators.required],
      lat: [null],
      lng: [null]
    });
  }

  async insertCatch(): Promise<void> {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const uidKey = '_uid';
    const tripIdKey = '_tripId';
    this.form.value[uidKey] = this.uid;
    this.form.value[tripIdKey] = this.tripId;
    this.catchService.insertCatch(this.uid, this.tripId, this.form.value).subscribe(
      (res: any) => {
        this.data = res;
        this.toastr.success(JSON.stringify(this.data.code), JSON.stringify(this.data.message),
        {
          timeOut: 3000,
          progressBar: true,
        });

        this.getCatches(this.uid, this.tripId);
        this.form.reset();
        this.submitted = false;
      },
      (error: any) => console.log('emited error:', error),
      () => console.log('insert catch complete')
    );
  }

  deleteCatch(uid: string, tripId: string, id: string): void {
    this.show = false;
    this.prevMapId = '';
    this.catchService.deleteCatch(uid, tripId, id).subscribe(
      (res: any) => {
      this.data = res;
      this.toastr.error(JSON.stringify(this.data.code), JSON.stringify(this.data.message), {
        timeOut: 3000,
        progressBar: true
      });
      this.getCatches(this.uid, this.tripId);
      },
      (error: any) => console.log('emited error:', error),
      () => console.log('delete catch complete')
    );
  }

  triggerModal(content: any, ariaLbl: string): any {
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

  getCatchData(uid: string, tripId: string, id: string): void {
    this.catchService.getCatch(uid, tripId, id).subscribe((res: any) => {
      this.data = res;
      this.catch = this.data;
      console.log(this.catch);
      this.updateCatchForm = new FormGroup({
        species: new FormControl(this.catch.species, Validators.required),
        length: new FormControl(this.catch.length, [Validators.required]),
        weight: new FormControl(this.catch.weight, Validators.required),
        location: new FormControl(this.catch.location, Validators.required),
        lat: new FormControl(this.catch.lat),
        lng: new FormControl(this.catch.lng)
      });
    });
  }

  async getCatchLocation(uid: string, tripId: string, id: string): Promise<void> {
    this.locationdata = await this.catchService.getCatch(uid, tripId, id).toPromise();
    this.catch = this.locationdata;
  }

  updateCatchData(id: string): any {
    this.submitted2 = true;

    if (this.updateCatchForm.invalid) {
      return;
    }
    this.show = false;
    this.catchService.updateCatch(this.uid, this.tripId, id, this.updateCatchForm.value).subscribe(
      (res: any) => {
      this.data = res;
      this.toastr.success(JSON.stringify(this.data.code), JSON.stringify(this.data.message), {
        timeOut: 3000,
        progressBar: true,
      });

      this.getCatches(this.uid, this.tripId);
      this.submitted2 = false;
      this.updateCatchForm.reset();
      },
      (error: any) => console.log('emited error:', error),
      () => console.log('updating catch complete')
    );
  }

  async updateCatchLocationData(id: any): Promise<void> {
    await this.getCoord();
    this.catchService.updateCatchLocation(this.uid, this.tripId, id, this.coordinate).subscribe(
      (res: any) => {
      this.data = res;
      this.toastr.success(JSON.stringify(this.data.code), JSON.stringify(this.data.message), {
        timeOut: 3000,
        progressBar: true,
      });
      this.getCatches(this.uid, this.tripId);
      this.submitted2 = false;
      this.updateCatchForm.reset();
      },
      (error: any) => console.log('emited error:', error),
      () => console.log('updating catch location complete')
    );
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

  async getCoord(): Promise<void> {
    await this.getPosition().then(pos => {
      this.coordinate = {lat: pos.lat, lng: pos.lng};
    });
  }
}
