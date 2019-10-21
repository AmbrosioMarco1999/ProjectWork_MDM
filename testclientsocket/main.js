var socket = io('http://localhost:5000', { query: 'auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF5bG9hZCI6ImNpYW9AY2lhby5iaXoiLCJpYXQiOjE1NzA4OTEzNzAsImV4cCI6MTU3MDg5MjgxMH0.Xuxtvpadpk2ZPWXUR4-jH7m_uDeld5MQYTPVmJM48zk' });

let targhe = [
  'CA128TD',
  'DB94111',
  'AA17424',
  'EE119CA',
  'PI11063',
  'PD54715',
  'SA88180',
  'PD2345B',
  'PI2933G',
  'RMSUF74'
]

socket.on('error', function (err) {
  console.log(err)
  throw new Error(err);
});
// Connection succeeded
socket.on('success', function (data) {
  console.log(data);
})

setInterval(() => {
  socket.emit('GET_PULLMAN_DATA', targhe[0])
}, 10000)
socket.on('PULLMAN_DATA', function (data) { console.log(data) })