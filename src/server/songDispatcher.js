const FRAGMENT_SIZE = 40000;
var fs = require('fs');

exports.getFragment = function(songID,fragment){
	try{
		let bitmap = fs.readFileSync(__dirname + "/mp3/"+songID);
		let buffer = new Buffer(bitmap).toString('base64');
		/* split buffer into correct fragment size*/
		buffer = buffer.substring(FRAGMENT_SIZE*fragment,FRAGMENT_SIZE*(fragment+1));
		//console.log(`BUFFER SIZE: ${buffer.length}`);
		return buffer;
	}catch(err){
		return "";
	}
}

exports.getFileSize = function(songID){
	try{
		let bitmap = fs.readFileSync(__dirname + "/mp3/"+songID);
		let buffer = new Buffer(bitmap).toString('base64');
		return Math.ceil(buffer.length/FRAGMENT_SIZE);
	}catch(err){
		return "";
	}
}
