var dgram = require('dgram');
var socket = dgram.createSocket('udp4');
var proxy = require('./proxy.js');

/* send a request to our dispatcher server 
 *
 * req should look like:
 * { 'remoteMethod': 'commandName',
 *   'objectName': 'objectName',
 *   'params':{
 *		'songID': 'songid'
 *		'fragment': 'fragmentNum'
 *	  }
 * }
 */
exports.request = function(req){
	/* Convert our json request to a buffer */
	let buffer = JSON.stringify(req);
	buffer = Buffer.from(buffer);

	/* Send the buffer to our server */
	socket.send(buffer,5001,'ponceplayer.com',(err) => {
		if(err) console.error(err);
		//else console.log('client buffer sent:'+req);
	});
}

/* Recieve the result from our request 
 * ret should look like:
 * { 'remoteMethod' : 'method,
 *   'ret' : 'returnBytes'
 *   'error' : 'error' //If no error, would be null
 * }
 */
socket.on('message',function(msg,rinfo){
	let ret = msg.toString();
	ret = JSON.parse(ret);
	/* Deal with Song chunk in proxy */
	proxy.onReturn(ret);
});

socket.on('error',function(err){
	console.error(err);
});

socket.on('listening',() => {
	const address = socket.address();
	console.log(`Listening on ${address.address}:${address.port}`);
});

socket.bind(5002);
