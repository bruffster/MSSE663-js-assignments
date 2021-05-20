const mongoose = require('mongoose');


// Okta User Schema
const OktaUser = mongoose.model('oktausers', {
  email: {
    type: String,
    required: true
  },
  uid: {
    type: String,
    required: true
  }
});

// Trip Schema
const Trip = mongoose.model('trips', {
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
});

// catch
const Catch = mongoose.model('catches', {
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
});

module.exports = { OktaUser, Trip, Catch }