const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    default: null
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
  },
  active: {
    type: Boolean,
    default: true
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
