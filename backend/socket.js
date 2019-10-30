var io = {};
var jwtAuth = require('socketio-jwt-auth');
const db = require('./config/keys');
const influx = require('./models/pullmanData');
const config = require('./config/keys')
const User = require('./models/user');

module.exports = (server, serveradmin) => {
  io = require('socket.io')(server);
  io.use(jwtAuth.authenticate({
    secret: config.secret,
    algorithm: 'HS256'
  }, function (payload, done) {
    // done is a callback, you can use it as follows
    User.findOne({ id: payload.sub }, function (err, user) {
      if (err) {
        // return error
        return done(err);
      }
      if (!user) {
        // return fail with an error message
        return done(null, false, 'user does not exist');
      }
      // return success with a user info
      return done(null, user);
    });
  }));

  io.on('connection', function (socket) {
    let user = socket.request.user
    user.password = undefined
    setInterval(() => {
      influx.query(
        "select targa from pullman WHERE time > now() - 5s order by time desc"
      )
        .catch(err => {
          console.log(err)
        })
        .then(results => {
          socket.emit('ACTIVE_PULLMANS', results);
        });
    }, 3000);
    socket.on('GET_PULLMAN_DATA', function (targa) {
      influx.query(
        "select * from pullman WHERE targa = '" + targa + "' AND time > now() - 10s order by time desc LIMIT 1"
      )
        .catch(err => {
          console.log(err)
        })
        .then(results => {
          socket.emit('PULLMAN_DATA', results)
        });
    })
  });
}


