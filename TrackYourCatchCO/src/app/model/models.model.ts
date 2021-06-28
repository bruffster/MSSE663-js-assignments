export class OktaUser {
  id!: string;
  email!: string;
  uid!: string;
}

export class Trip {
  id!: string;
  tripName!: string;
  location!: string;
  date: any;
}

export class Catch {
  _id!: string;
  uid!: string;
  tripId!: string;
  species!: string;
  length!: number;
  weight!: number;
  location!: string;
  lat!: number;
  lng!: number;
}

export class Settings {
  id!: string;
  googleapikey: any;
}
