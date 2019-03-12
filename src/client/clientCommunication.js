var dgram = require('dgram');
var socket = dgram.createSocket('udp4');
var proxy = require('./proxy.js');

/* send a request to our dispatcher server 
 * @param req should look like:
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
	});
}

/* Recieve the result from our request 
 * ret should look like:
 * { 'remoteMethod' : 'method,
 *   'ret' : 'returnBytes'
 *   'error' : 'error' //If no error, would be null
 *   'params':{
 *		'songID': 'songid'
 *		'fragment': 'fragmentNum'
 *	  }
 * }
 */
socket.on('message',function(msg,rinfo){
	/* Parse json */
	let ret = msg.toString();
	ret = JSON.parse(ret);

	/* Deal with Song chunk in proxy */
	proxy.onReturn(ret);
});

/* Log any errors */
socket.on('error',function(err){
	console.error(err);
});

/* Log what address and port it started on */
socket.on('listening',() => {
	const address = socket.address();
	console.log(`Listening on ${address.address}:${address.port}`);
});

/* Start our datagram on socket  5002 */
socket.bind(5002);
