const express = require('express');
const router = express.Router();


const { OktaUser, Trip } = require ('../models/model');


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

module.exports = router;  
