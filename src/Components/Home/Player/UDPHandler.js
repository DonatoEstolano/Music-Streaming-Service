var buffer = require('buffer');
var udp = require('dgram');

var client = udp.createSocket('udp4');

var data = Buffer.from('Hello from client');

client.on('message',function(msg,info){
	console.log("data received: "+msg.toString());
	console.log(info);
});

client.send(data,2222,'ponceplayer.com',function(error){
	if(error) console.error(error);
	else console.log('data sent');
});

