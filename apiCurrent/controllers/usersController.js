const bcrypt = require('bcryptjs');
const passport = require('passport');
const svgCaptcha = require('svg-captcha');
const User = require('../models/user');

exports.user_registerPost = async function(req, res) {
    try{
        const { email, name, surname, employeeId, password, password2, captcha } = req.body;
  let errors = [];

  if (!email || !name || !surname || !employeeId || !password || !password2 || !captcha) {
    errors.push({ msg: 'Please enter all fields' });
}

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }
  if(captcha != req.session.captcha) {
    errors.push({ msg: 'Captcha Incorrect' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      email,
      name,
      surname,
      employeeId,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already registered' });
        res.render('register', {
          errors,
          email,
          name,
          surname,
          employeeId,
          password,
          password2
        });
      } else {
        const newUser = new User({
          email,
          name,
          surname,
          employeeId,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
    }catch(err){
      console.log(err);
    }
}

exports.user_loginPage = async function(req, res) {
    try{
        res.render('login');
    }catch(err){
      console.log(err);
    }
}

exports.user_registerPage = async function(req, res) {
    try{
        res.render('register');
    }catch(err){
      console.log(err);
    }
}

exports.user_loginPost = async function(req, res, next) {
    try{
        passport.authenticate('local', {
            successRedirect: '/dashboard',
            failureRedirect: '/users/login',
            failureFlash: true
          })(req, res, next);
    }catch(err){
        console.log(err);
    }
}

exports.user_logoutPost = async function(req, res) {
    try{
        req.logout();
        req.flash('success_msg', 'You are logged out');
        res.redirect('/users/login');
        setTimeout(() => {
          req.session.destroy();
        }, 1000);
    }catch(err){
       console.log(err);
    }
}

exports.user_captcha = async function(req, res) {
    try{
        var captcha = svgCaptcha.create();
        req.session.captcha = captcha.text;  
        res.type('html');
        res.status(200).send(captcha.data);
    }catch(err){
      console.log(err);
    }
}

exports.user_changePassword = async function(req, res) {
  try{
      res.render('changePassword');
  }catch(err){
    console.log(err);
  }
}

exports.user_changePasswordPost = async function(req, res) {
  try{
    try{
      const { email, password, newpassword, newpassword2 } = req.body;
let errors = [];

if (!email || !password || !newpassword || !newpassword2) {
  errors.push({ msg: 'Please enter all fields' });
}

if (newpassword != newpassword2) {
  errors.push({ msg: 'New passwords do not match' });
}

if (newpassword.length < 6) {
  errors.push({ msg: 'New password must be at least 6 characters' });
}

if (errors.length > 0) {
  res.render('changePassword', {
    errors,
    username,
  });
} else {
  User.findOne({ email: email }).then(user => {
    if (!user) {
      errors.push({ msg: 'E-Mail' });
      res.render('register', {
        errors,
        email,
      });
    } else {
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newpassword, salt, (err, hash) => {
              if (err) throw err;
              user.password = hash;
              user
                .save()
                .then(user => {
                  req.flash(
                    'success_msg',
                    'You have changed your password'
                  );
                  res.redirect('/users/login');
                })
                .catch(err => console.log(err));
            });
          });
        } else {
          return done(null, false, { message: 'Password incorrect' });
        }
      });
    }
  });
}
  }catch(err){
    console.log(err);
  }
  }catch(err){
    console.log(err);
  }
}

// router.post('/login', passport.authenticate("local", 
//     {
//         successRedirect: "/",
//         failureRedirect: "/auth/login",
//         successFlash: true,            
//         failureFlash: true,
//         successFlash: 'Succesfu1!',
//         failureFlash: 'Invalid username or passwerd.'
//     })
// );

