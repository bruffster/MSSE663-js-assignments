const express = require('express');
const router = express.Router();


const { OktaUser, Trip, Catch } = require ('../models/model');


// Get All Trips for User
router.get('/api/:uid/trips', (req, res) => {
  Trip.find({ _uid: req.params.uid }, (err, data) => {
    if(!err) {
      res.send(data);
    } else {
      console.log(err);
    }
  });
});

// Save Trip
router.post('/api/trip/add', (req, res) => {
  const trip = new Trip({
    tripName: req.body.tripName,
    location: req.body.location,
    date: req.body.date,
    _uid: req.body._uid,
  });

  trip.save((err, data) => {
    res.status(200).json({ code: 200, message: 'Trip Added Successfully', addTrip: data});
    console.log('body');
    console.log(trip);
  });
});

// Get Single Trip
router.get('/api/trip/:id', (req, res) => {
  Trip.findById(req.params.id, (err, data) => {
    if(!err) {
      res.send(data);
    } else {
      console.log(err);
    }
  })
});

// Update Trip
router.put('/api/trip/edit/:id', (req, res) => {
  const trip = {
    tripName: req.body.tripName,
    location: req.body.location,
    date: req.body.date
  };
  Trip.findByIdAndUpdate(req.params.id, { $set:trip }, { new:true }, (err, data) => {
    if(!err) {
      res.status(200).json({ code: 200, message: 'Trip Updated Successfully', updateTrip: data });
    } else {
      console.log(err);
    }
  });
});

// Delete trip
router.delete('/api/trip/:id', (req, res) => {
  Trip.findByIdAndRemove(req.params.id, (err, data) => {
    if(!err) {
      res.status(200).json({ code: 200, message: 'Trip Deleted Successfully', deleteTrip: data});
    } else {
      console.log(err);
    }
  });
});


// Get All Catches for a trip
router.get('/api/:uid/trips/:tripId/catches', (req, res) => {
  Catch.find({ _uid: req.params.uid, _tripId: req.params.tripId }, (err, data) => {
    if(!err) {
      res.send(data);
    } else {
      console.log(err);
    }
  });
});

// Save Catch
router.post('/api/:uid/trips/:tripId/catch/add', (req, res) => {
  const newCatch = new Catch({
    species: req.body.species,
    weight: req.body.weight,
    length: req.body.length,
    location: req.body.location,
    _uid: req.body._uid,
    _tripId: req.body._tripId
  });

  newCatch.save((err, data) => {
    res.status(200).json({ code: 200, message: 'Catch Added Successfully', addCatch: data});
    console.log('body');
    console.log(newCatch);
  });
});


// Delete catch
router.delete('/api/:uid/trips/:tripId/catches/:id', (req, res) => {
  Catch.findByIdAndRemove(req.params.id, (err, data) => {
    if(!err) {
      res.status(200).json({ code: 200, message: 'Catch Deleted Successfully', deleteTrip: data});
    } else {
      console.log(err);
    }
  });
});

// Get Single Trip
router.get('/api/:uid/trips/:tripId/catches/:id', (req, res) => {
  Catch.findById(req.params.id, (err, data) => {
    if(!err) {
      res.send(data);
    } else {
      console.log(err);
    }
  });
});

// Update Trip
router.put('/api/:uid/trips/:tripId/catches/edit/:id', (req, res) => {
  const catchData = {
    species: req.body.species,
    length: req.body.length,
    weight: req.body.weight,
    location: req.body.location
  };
  Catch.findByIdAndUpdate(req.params.id, { $set:catchData }, { new:true }, (err, data) => {
    if(!err) {
      res.status(200).json({ code: 200, message: 'Catch Updated Successfully', updateTrip: data });
    } else {
      console.log(err);
    }
  });
});

// Save Okta User Info
router.post('/api/addOktaUser', (req, res) => {
  const oktaU = new OktaUser({
    email: req.body.email,
    uid: req.body.uid
  });
  oktaU.save((err, data) => {
    res.status(200).json({ code: 200, message: 'Okta User Added Successfully', addOktaUser: data});
  });
});

// Get Okta User By ID
router.get('/api/okta/:uid', (req, res) => {
  OktaUser.findOne({uid: req.params.uid}, (err, data) => {
    if(!err) {
      console.log(data);
      res.send(data);
    } else {
      console.log(err);
    }
  })
});

module.exports = router;  
