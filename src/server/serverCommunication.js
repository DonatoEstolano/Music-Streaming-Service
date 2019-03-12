var dgram = require('dgram');
var socket = dgram.createSocket('udp4');
var dispatcher = require('./dispatcher.js');

socket.on('message',function(msg,rinfo){
	let req = msg.toString();
	req = JSON.parse(req);
	dispatcher.request(req,rinfo);
});

exports.reply = function(rep,rinfo){
	/* Convert our json request to a buffer */
	let buffer = JSON.stringify(rep);
	buffer = Buffer.from(buffer);

	/* Send the buffer to our client */
	socket.send(buffer,rinfo.port,rinfo.address,(err) => {
		if(err) console.error(err);
		//else console.log('server buffer sent:'+rep);
	});
}

socket.on('error',function(err){
	console.error(err);
});

socket.on('listening',() => {
	const address = socket.address();
	console.log(`Listening on ${address.address}:${address.port}`);
});

socket.bind(5001);
