const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Okta User Schema
/*const OktaUser = mongoose.model('oktausers', {
  email: {
    type: String,
    required: true
  },
  uid: {
    type: String,
    required: true
  }
});*/

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
/*const Trip = mongoose.model('trips', {
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
  }
});*/

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
/*const Catch = mongoose.model('catches', {
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
  _uid: {
    type: String,
    required: true
  },
  _tripId: {
    type: String,
    required: true
  }
});*/

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


module.exports = {
  OktaUser: OktaUser,
  Trip: Trip,
  Catch: Catch,
}
//module.exports = { OktaUser, Trip, Catch }