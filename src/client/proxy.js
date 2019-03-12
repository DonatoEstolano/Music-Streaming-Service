/* We have to use express as our music buffer compiler */
var ccom = require('./clientCommunication.js');

const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");
const app = express();
const port = 5003;

const stream = require('stream');
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
	bufferStream.unpipe();
	/* reset id and fragment */
	songID = req.params.songID;
	fragment = 0;
	/* connect our pipe to our request */
	bufferStream.pipe(res);
	/* Request our first package */
	requestSong();
});

//======== PROXY ===========

/* Current song id and fragment */
var songID = '';
var fragment = 0;

/* Request the song using our communication module
 * @param params optional parameter. It is used to check if the next package request is the correct package
 */
function requestSong(params){
	/* Check if we're requesting the correct package */
	if(params&&(songID!=params.songID||fragment!=params.fragment+1))
		return;

	/* Construct our json */
	let json = {
		'remoteMethod' : 'getSongChunk',
		'objectName' : 'SongServices',
		'params' : {
			'songID' : songID,
			'fragment' : fragment
	}};
	fragment++;

	/* Request package */
	ccom.request(json);
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
	switch(ret.remoteMethod){
		case 'getSongChunk':
		      writeBuffer(ret.ret,ret.params);
		      break;
		default:
		      console.error('Invalid return type');
	}
}

/* Write to our buffer that will pipe it back to our client
 * @param buff our music stream buffer
 * @param params the song info of the package 
 */
function writeBuffer(buff,params){
	if(buff&&buff.length>0&&songID==params.songID&&fragment==params.fragment+1){
		console.log(params);
		//console.log(`Writing song fragment ${fragment-1} to buffer`);
		bufferStream.write(new Buffer(buff,'base64'));
		setTimeout(function(){requestSong(params)},1000);
	}
}

/* Start listening to our client */
app.listen(port, () => console.log(`Proxy listening on port ${port}`));
