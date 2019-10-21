const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/keys')

exports.user_login = async function (req, res, next) {
  if (!req.body.email || !req.body.password) { return res.status(400).send('Credenziali mancanti'); }
  try {
    var email = req.body.email;
    User.findOne({ email: email }).then(user => {
      if (!user) {
        return res.status(400).send('Utente non registrato');
      }
      if (user.active) {
        bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            user.lastLoginDate = Date.now()
            user.save()
            var userToken = {
              id: 1,
              email: email
            };
            const token = jwt.sign({ playload: userToken.email }, config.secret, {
              expiresIn: 60 * 24 // expires in 24 hours
            });
            res.status(202).send({ token });
          } else {
            res.status(400).send();
          }
        })
      }
      else { res.status(401).send('Your account is blocked'); }
    }).catch((err) => { res.status(500).send('Error'); });
  } catch (err) {
    res.status(500).send('Error');
  }
}

exports.user_register = async function (req, res, next) {
  try {
    if (req.body.email && req.body.password && req.body.name) {
      User.findOne({ email: req.body.email }).then(user => {
        if (!user) {
          const newUser = new User({
            email: req.body.email,
            password: null,
            name: req.body.name,
            permissionLevel: 0,
            registration_date: null,
            last_login_date: null,
            active: true
          });
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
              if (err) { res.status(500).send('Error') };

              newUser.password = hash;
              newUser
                .save()
                .then(user => {
                  res.status(200).send('Registered');
                })
                .catch(err => console.log(err));
            });
          });
        }
      });
    }
    else { res.status(400).send() }
  } catch (err) {
    res.status(500).send('Error')
  }
}

exports.user_token = async function ( req, res, next ) {
   res.status(200).send()
}