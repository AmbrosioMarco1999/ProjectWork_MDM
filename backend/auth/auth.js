var express = require('express');
const jwt = require('jsonwebtoken');
const conf = require('../config/keys')
const ProtectedRoutes = express.Router();

ProtectedRoutes.use((req, res, next) => {
  var token = req.headers['authorization'];
  if (token) {
    token = token.slice(7);
    jwt.verify(token, conf.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send('Invalid token');
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(400).send('No token provided');
  }
});

module.exports = ProtectedRoutes;