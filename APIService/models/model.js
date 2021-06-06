const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Okta User Schema
const OktaUserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  uid: {
    type: String,
    required: true
  },
},
{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }   
});
const OktaUser = mongoose.model('oktausers', OktaUserSchema);

// Trip Schema
const TripSchema = new Schema({
  tripName: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  _uid: {
    type: String,
    required: true
  },
},
{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }   
});

const Trip = mongoose.model('trips', TripSchema);


// catch
const CatchSchema = new Schema({
  species: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  length: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  lat: {
    type: Number,
    required: false
  },
  lng: {
    type: Number,
    required: false
  },
  _uid: {
    type: String,
    required: true
  },
  _tripId: {
    type: String,
    required: true
  },
},
{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }   
});

const Catch = mongoose.model('catches', CatchSchema);

// settings
const SettingsSchema = new Schema({
  googleapikey: {
    type: String,
    required: true
  }
});

const Settings = mongoose.model('settings', SettingsSchema);


module.exports = {
  OktaUser: OktaUser,
  Trip: Trip,
  Catch: Catch,
  Settings: Settings,
}