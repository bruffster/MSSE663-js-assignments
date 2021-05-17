const mongoose = require('mongoose');

// Employee Schema
const Employee = mongoose.model('Employee', {
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  salary: {
    type: String,
    required: true
  }
});

// Employee Schema v2
const Employee2 = mongoose.model('Employee2', {
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

// Employee Schema v2
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

module.exports = { Employee, Employee2, OktaUser }