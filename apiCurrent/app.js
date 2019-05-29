const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
//const redis = require('redis');
const redisStore = require('connect-redis')(session);
const redisUrl = require('redis-url');
const db = require('./config/keys');
const app = express();

var sessionStore = new redisStore({ client: redisUrl.connect(db.redisIp)});

app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(cors());

require('./config/passport')(passport);

app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({     
  extended: true
})); 

mongoose
  .connect(
    db.mongoConnectionString,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use(
    session({
        store: sessionStore,
        unset: 'destroy',
        secret: 'S0n0s3gr3t1ss1m4',
        httpOnly: true,
        rolling: true,
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: 1000 * 60 * 60 }
        // cookie: { 
        //    expires: new Date(Date.now() + 60 * 1000), 
        //    maxAge: (60 * 1000)
        //  }
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.use(function(req, res, next) {
  //console.log(req.session);
  next();
})

app.use('/', require('./routes/index.js'));
app.use('/test', require('./routes/test.js'));
app.use('/users', require('./routes/users.js'));
app.use('/pullman', require('./routes/influx.js'));

  // Handle 404
  app.use(function(req, res) {
    res.status(404);
    res.render('error404');
 });
 
//Handle 500
 app.use(function(error, req, res, next) {
    res.status(500);
    res.send('500: Internal Server Error');
 });


const PORT = process.env.PORT || 5000;

var server = http.createServer(app);
server.listen(PORT, function () {
  console.log('app listening on : ' + PORT);
  require('./socket')(server);
  console.log('socket server will be on : ' + PORT);
});
