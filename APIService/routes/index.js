const express = require('express');
const router = express.Router();


const { Employee, Employee2, OktaUser, Trip } = require ('../models/model');



// Get All Employees
router.get('/api/:uid/employees', (req, res) => {
  Employee.find({ _uid: req.params.uid }, (err, data) => {
    //Employee.find({ }, (err, data) => {
    if(!err) {
      res.send(data);
    } else {
      console.log(err);
    }
  });
});

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

// Save Employee
router.post('/api/employee/add', (req, res) => {
  const emp = new Employee({
    name: req.body.name,
    email: req.body.email,
    salary: req.body.salary,
    _uid: req.body._uid,
  });
  emp.save((err, data) => {
    res.status(200).json({ code: 200, message: 'Employee Added Successfully', addEmployee: data});
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
router.post('/api/employee/addOktaUser', (req, res) => {
  const oktaU = new OktaUser({
    email: req.body.email,
    uid: req.body.uid
  });
  oktaU.save((err, data) => {
    res.status(200).json({ code: 200, message: 'Okta User Added Successfully', addOktaEmployee: data});
  });
});

// Get Single Employee
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

// Update Employee
router.put('/api/employee/edit/:id', (req, res) => {
  const emp = {
    name: req.body.name,
    email: req.body.email,
    salary: req.body.salary
  };
  Employee.findByIdAndUpdate(req.params.id, { $set:emp }, { new:true }, (err, data) => {
    if(!err) {
      res.status(200).json({ code: 200, message: 'Employee Updated Successfully', updateEmployee: data });
    } else {
      console.log(err);
    }
  });
});

// Delete Employee

router.delete('/api/trip/:id', (req, res) => {
  Trip.findByIdAndRemove(req.params.id, (err, data) => {
    if(!err) {
      res.status(200).json({ code: 200, message: 'Trip Deleted Successfully', deleteEmployee: data});
    } else {
      console.log(err);
    }
  });
});

module.exports = router;  
