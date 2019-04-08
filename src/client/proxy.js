/* We have to use express as our music buffer compiler */
var ccom = require('./clientCommunication.js');

const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");
const app = express();
const port = 5003;

const stream = require('stream');
var songBufferStream = new stream.PassThrough();
var bufferStream = new stream.PassThrough();

app.use(cors());
app.use(bodyParser.json());

var whitelist = ['http://localhost', 'localhost','ponceplayer.com','http://ponceplayer.com']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

/* This will start our udp request via the clientCommunication.js 
 * @param songID the id of the song 
 */
app.get("/song/:songID",cors(corsOptionsDelegate),function(req, res){
	/* Reset our buffer pipe */
	songBufferStream.unpipe();
	/* reset id and fragment */
	songID = req.params.songID;
	fragment = 0;
	/* connect our pipe to our request */
	songBufferStream.pipe(res);
	/* Request our first package */
	requestSong();
});

/* Grab song list */
app.get("/getsongs/:count/:page",cors(corsOptionsDelegate),function(req, res){
	bufferStream = new stream.PassThrough();

	let count = parseInt(req.params.count);
	let page = parseInt(req.params.page);
	
	method = "getSongs";
	requestSongList(count,page);
	bufferStream.pipe(res);
});

/* Creates a new user */
app.get("/signup/:username/:password",cors(corsOptionsDelegate),function(req, res){
	let username = req.params.username;
	let password = req.params.password;
	method = "createUser";
	requestSignup(username,password);
	res.send('ok');
});

/* authenticates a user */
app.get("/authenticate/:username/:password",cors(corsOptionsDelegate),function(req, res){
	bufferStream = new stream.PassThrough();
	let username = req.params.username;
	let password = req.params.password;
	method = "authenticateUser";
	bufferStream.pipe(res);
	let json = {
		'remoteMethod' : "authenticateUser",
		'objectName' : 'UserServices',
		'param' : {
			username,
			password
		}
	};
	ccom.request(json);
});

app.get("/getplaylists/:username",cors(corsOptionsDelegate),function(req, res){
	bufferStream = new stream.PassThrough();
	let username = req.params.username;
	method = "getPlaylist";
	bufferStream.pipe(res);
	let json = {
		'remoteMethod' : "getPlaylist",
		'objectName' : 'PlaylistServices',
		'param' : {
			username,
		}
	};
	ccom.request(json);
});

app.get("/createplaylist/:username/:playlistName",cors(corsOptionsDelegate),function(req, res){
	bufferStream = new stream.PassThrough();
	let username = req.params.username;
	let playlistName = req.params.playlistName;
	method = "createplaylist";
	bufferStream.pipe(res);
	let json = {
		'remoteMethod' : 'createPlaylist',
		'objectName' : 'PlaylistServices',
		'param' : {
			username,
			playlistName
		}
	};
	ccom.request(json);
});

app.get("/deleteplaylist/:username/:playlistName",cors(corsOptionsDelegate),function(req, res){
	bufferStream = new stream.PassThrough();
	let username = req.params.username;
	let playlistName = req.params.playlistName;
	method = "deletePlaylist";
	bufferStream.pipe(res);
	let json = {
		'remoteMethod' : 'deletePlaylist',
		'objectName' : 'PlaylistServices',
		'param' : {
			username,
			playlistName
		}
	};
	ccom.request(json);
});

app.get("/addsong/:username/:playlistName/:songid/:songname/:artist/:duration",cors(corsOptionsDelegate),function(req, res){
	bufferStream = new stream.PassThrough();
	let username = req.params.username;
	let playlist = req.params.playlistName;
	let songid = req.params.songid;
	let songname = req.params.songname;
	let artist = req.params.artist;
	let duration = req.params.duration;
	method = "addSong";
	bufferStream.pipe(res);
	let json = {
		'remoteMethod' : 'addSong',
		'objectName' : 'PlaylistServices',
		'param' : {
			username, playlist, songid, songname, artist, duration
		}
	};
	ccom.request(json);
});

app.get("/deletesong/:username/:playlistName/:songid/",cors(corsOptionsDelegate),function(req, res){
	bufferStream = new stream.PassThrough();
	let username = req.params.username;
	let playlist = req.params.playlistName;
	let songid = req.params.songid;
	method = "deleteSong";
	bufferStream.pipe(res);
	let json = {
		'remoteMethod' : 'deleteSong',
		'objectName' : 'PlaylistServices',
		'param' : {
			username, playlist, songid
		}
	};
	ccom.request(json);
});

//======== PROXY ===========

/* Current song id and fragment */
var songID = '';
var fragment = 0;
var method;

/* Request the song using our communication module
 * @param params optional parameter. It is used to check if the next package request is the correct package
 */
function requestSong(ret){
	/* Check if we're requesting the correct package */
	if(ret&&(
				songID!=ret.param.song||
				fragment!=ret.param.fragment+1))
		return;

	/* Construct our json */
	let json = {
		'remoteMethod' : "getSongChunk",
		'objectName' : 'SongServices',
		'param' : {
			'song' : songID,
			'fragment' : fragment
	}};
	fragment++;

	/* Request package */
	ccom.request(json);
}

function requestSongList(count,page){
	let json = {
		'remoteMethod' : "getSongs",
		'objectName' : 'SongServices',
		'param' : {
			'count':count,
			'page':page
		}
	};

	ccom.request(json);
}

function requestSignup(username,password){
	let json = {
		'remoteMethod' : "createUser",
		'objectName' : 'UserServices',
		'param' : {
			username,
			password
		}
	};

	ccom.request(json);
}

function requestAuthenticate(username,password){
}


/* Called when we recieve a return from our server
 * @param ret json from return 
 */
exports.onReturn = function(ret){
	/* Check if there was an error */
	if(ret.error){
		console.error(ret);
		return;
	}
	/* check what method we called */
	switch(ret.method){
		case 'getSongChunk':
		      writeSongBuffer(ret);
		      break;
		default:
			returnRet(ret);
	}
}

/* Write to our buffer that will pipe it back to our client
 * @param buff our music stream buffer
 * @param params the song info of the package 
 */
function writeSongBuffer(ret){
	let buff = ret.ret;
	let params = ret.param;
	if(buff&&buff.length>0&&songID==params.song&&fragment==params.fragment+1){
		//console.log(`Writing song fragment ${fragment-1} to buffer`);
		let buf = new Buffer(buff,'base64');
		songBufferStream.write(buf);
		requestSong(ret);
	}
}

function returnRet(ret){
	bufferStream.write(ret.ret);
	bufferStream.end();
}

/* Start listening to our client */
app.listen(port, () => console.log(`Proxy listening on port ${port}`));
