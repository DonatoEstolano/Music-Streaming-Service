var scom = require('./serverCommunication.js');
var sDispatcher = require('./songDispatcher.js');

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

function returnSongChunk(req,rinfo){
	let songID = req.params.songID;
	let fragment = req.params.fragment;
	let buffer = sDispatcher.getFragment(songID,fragment);
	let ret = {
		'remoteMethod' : 'getSongChunk',
		'ret' : buffer,
		'params': {
			'songID' : songID,
			'fragment' : fragment,
		}
	}
	scom.reply(ret,rinfo);
}

function returnFileSize(req,rinfo){
	let songID = req.params.songID;
	let size = sDispatcher.getFileSize(songID);
	let ret = {
		'remoteMethod' : 'getFileSize',
		'ret' : size
	}
	scom.reply(ret,rinfo);
}

function returnError(reason,rinfo){
	let ret = {
		'error' : reason
	};
	scom.reply(ret,rinfo);
}
