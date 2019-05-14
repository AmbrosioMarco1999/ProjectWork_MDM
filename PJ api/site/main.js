var socket = io();
socket.on('data',function(results){
    console.log(results);
})
