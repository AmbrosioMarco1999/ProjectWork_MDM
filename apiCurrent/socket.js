var io = {};
var passportSocketIo = require("passport.socketio");
var cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const redisStore = require('connect-redis')(session);
const redisUrl = require('redis-url');
const db = require('./config/keys');
const influx = require('./models/pullmanData');

module.exports = (server, serveradmin) => {
    io = require('socket.io')(server);
    io.use(passportSocketIo.authorize({
        store:  new redisStore({ client: redisUrl.connect(db.redisIp) }),
        key: 'connect.sid',
        secret: 'S0n0s3gr3t1ss1m4',
        passport: passport,
        cookieParser: cookieParser
      }));

  io.on('connection', function(socket) {
    socket.on('event', function(eventData) {
      if (socket.request.user && socket.request.user.logged_in) {
        socket.emit('test','ciao');
      }
    });
    setInterval(() => {
      data()
    }, 1000);
    async function data(){
      await influx.query(
        'select * from pullman WHERE time > now() - 1m order by time desc LIMIT 20'
        )
        .catch(err=>{
          
        })
        .then(results=>{
          socket.emit('msg',results);
          //console.log(socket.request.user);
      });
    }
  });

}
