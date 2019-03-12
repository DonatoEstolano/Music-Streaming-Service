var dgram = require('dgram');
var socket = dgram.createSocket('udp4');
var dispatcher = require('./dispatcher.js');

/* Recieve a message from our client proxy 
 * @param msg json message
 * @rinfo client address/port info
 * */
socket.on('message',function(msg,rinfo){
	/* Convert msg to json */
	let req = msg.toString();
	req = JSON.parse(req);
	/* Send json to our dispatcher */
	dispatcher.request(req,rinfo);
});

/* Sends a reply to our client
 * @param rep our reply in json format
 * @param rinfo our client info
 */
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

/* Error logging */
socket.on('error',function(err){
	console.error(err);
});

/* Debugging logs */
socket.on('listening',() => {
	const address = socket.address();
	console.log(`Listening on ${address.address}:${address.port}`);
});

/* Start socket */
socket.bind(5001);
