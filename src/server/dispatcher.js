var scom = require('./serverCommunication.js');
var sDispatcher = require('./songDispatcher.js');

/* Parse json request 
 * @param req the json request
 * @param rinfo client info
 * */
exports.request = function(req,rinfo){
	switch(req.remoteMethod){
		case 'getSongChunk':
			returnSongChunk(req,rinfo);
			break;
		case 'getFileSize':
			returnFileSize(req,rinfo);
			break;
		default:
			returnError("Invalid remote Method",rinfo);
	}
}

/* Returns the song chunk as base64
 * @param req json request
 * @param rinfo client info
 */
function returnSongChunk(req,rinfo){
	/* Parse data */
	let songID = req.params.songID;
	let fragment = req.params.fragment;
	let buffer = sDispatcher.getFragment(songID,fragment);
	/* Construct return json */
	let ret = {
		'remoteMethod' : 'getSongChunk',
		'ret' : buffer,
		'params': {
			'songID' : songID,
			'fragment' : fragment,
		}
	}
	/* send the json back to client */
	scom.reply(ret,rinfo);
}

/* Returns the song size
 * @param req json request
 * @param rinfo client info
 */
function returnFileSize(req,rinfo){
	/* Parse data */
	let songID = req.params.songID;
	let size = sDispatcher.getFileSize(songID);
	/* Construct return json */
	let ret = {
		'remoteMethod' : 'getFileSize',
		'ret' : size
	}
	/* Send the json back to client */
	scom.reply(ret,rinfo);
}

/* If there is an error, return it
 * @param reason reason of error
 * @param rinfo client  info
 */
function returnError(reason,rinfo){
	let ret = {
		'error' : reason
	};
	scom.reply(ret,rinfo);
}
