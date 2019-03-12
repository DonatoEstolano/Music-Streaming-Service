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

app.get("/song/:songID",cors(corsOptionsDelegate),function(req, res){
	bufferStream.unpipe();
	songID = req.params.songID;
	fragment = 0;
	bufferStream.pipe(res);
	requestSong();
});

//======== PROXY ===========

var songID = '';
var fragment = 0;

function requestSong(params){
	if(params&&(songID!=params.songID||fragment!=params.fragment+1))
		return;

	let json = {
		'remoteMethod' : 'getSongChunk',
		'objectName' : 'SongServices',
		'params' : {
			'songID' : songID,
			'fragment' : fragment
	}};
	fragment++;
	ccom.request(json);
}

exports.onReturn = function(ret){
	if(ret.error){
		console.error(ret);
		return;
	}
	switch(ret.remoteMethod){
		case 'getSongChunk':
		      writeBuffer(ret.ret,ret.params);
		      break;
		default:
		      console.error('Invalid return type');
	}
}

function writeBuffer(buff,params){
	if(buff&&buff.length>0&&songID==params.songID&&fragment==params.fragment+1){
		console.log(params);
		//console.log(`Writing song fragment ${fragment-1} to buffer`);
		bufferStream.write(new Buffer(buff,'base64'));
		setTimeout(function(){requestSong(params)},1000);
	}
}

app.listen(port, () => console.log(`Proxy listening on port ${port}`));
