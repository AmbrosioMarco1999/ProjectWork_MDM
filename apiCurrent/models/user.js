const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  employeeId: {
    type: String,
    required: true
  },
  permissionLevel: {
    type: Number,
    default: 0
  },
  password: {
    type: String,
    required: true
  },
  registerDate: {
    type: Date,
    default: Date.now
  },
  lastLoginDate: {
    type: Date,
    default: null
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
