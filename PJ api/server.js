const fastify = require('fastify')({ 
    logger: false, 
    ignoreTrailingSlash: true 
})

const io = require('socket.io')(fastify.server);

io.on('connection', function (socket) {
  console.log(socket.id);
  socket.on('message', function () { });
  socket.on('disconnect', function () { });
});

fastify.register(require('./db/influx'), { prefix: '/api/pullman' },{method:'post'})
//fastify.register(require('./api/getinfo'), { prefix: '/api/pullman' },{method:'get'})
fastify.get('/', async (request, reply) => {
  const fs = require('fs')
  const stream = fs.createReadStream('./site/index.html');
  reply.type('text/html').send(stream);
})
fastify.get('/main.js', async (request, reply) => {
  const fs = require('fs')
  const stream = fs.createReadStream('./site/main.js');
  reply.type('text/html').send(stream);
})

const Influx = require('influx');
const influx= new Influx.InfluxDB({
  host: '192.168.1.5',
  database: 'test',
  port:8086
  });
  //SELECT sum(value) FROM tweets WHERE hashtag = 'RT' AND time >= now() - 1h GROUP BY time(1m) ORDER BY time DESC LIMIT 60
setInterval(() => {
  influx.query(
    'select * from pullman WHERE id=1 order by time desc limit 1'
    )
    .catch(err=>{
    console.log(err);
    })
    .then(results=>{
    io.emit('data',results);
  });
}, 1000);


const start = async () => {
    try {
      await fastify.listen(3000)
      fastify.log.info(`server listening on ${fastify.server.address().port}`)
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  }
  start()

