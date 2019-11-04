const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const db = require('./config/keys');
const path = require('path');
const app = express();

let dbInit = require('./config/mongoInit')

app.disable('x-powered-by');
//app.set('trust proxy', 1);
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose
  .connect(
    db.mongoConnectionString,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('MongoDB Connected');
    // Filling pullmans table
    dbInit()
  })
  .catch(err => console.log(err.message));

app.use(function (req, res, next) {
  next();
})

//Serving front-end
const staticFileMiddleware = express.static('../frontend/dist');
app.use(staticFileMiddleware);

app.use('/users', require('./routes/users.js'));
app.use('/data/pullmans', require('./routes/influx.js'));
app.use('/pullmans', require('./routes/pullmans.js'));

// Handle 404
app.use(function (req, res) {
  res.status(404);
  res.send('404');
});

// Handle 500
app.use(function (err, req, res, next) {
  console.log(err)
  res.status(500)
    .json({
      name: err.name,
      message: err.message,
      trace: err.stack
    })
});

const PORT = process.env.PORT || 5000;

var server = http.createServer(app);
server.listen(PORT, function () {
  console.log('Server listening on : ' + PORT);
  require('./socket')(server);
  console.log('Socket on port : ' + PORT);
});
