export class OktaUser {
  _id:any;
  email:any;
  uid:any;
}

export class Trip {
  _id:any;
  tripName:any;
  location:any;
  date:any;
}

export class Catch {
  _id:any;
  _uid:any;
  _tripId:any;
  species:any;
  length:any;
  weight:any;
  location:any;
}