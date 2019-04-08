/* Our max fragment size */
const FRAGMENT_SIZE = 8192;
var fs = require('fs');

/* Gets a fragment of the requested song
 * @param songID song id
 * @param fragment fragment id of the song
 */
exports.getFragment = function(songID,fragment){
	try{
		/* Grab song */
		let bitmap = fs.readFileSync(__dirname + "/mp3/"+songID);
		/* Convert it to a base64 string */
		let buffer = new Buffer(bitmap).toString('base64');
		/* split buffer into correct fragment size*/
		buffer = buffer.substring(FRAGMENT_SIZE*fragment,FRAGMENT_SIZE*(fragment+1));
		//console.log(`BUFFER SIZE: ${buffer.length}`);
		return buffer;
	}catch(err){
		return "";
	}
}

/* Gets the file size  of a song 
 * @param songID the song id 
 */
exports.getFileSize = function(songID){
	try{
		/* Grab song */
		let bitmap = fs.readFileSync(__dirname + "/mp3/"+songID);
		/* Conver to base64 */
		let buffer = new Buffer(bitmap).toString('base64');
		/* Return size */
		return Math.ceil(buffer.length/FRAGMENT_SIZE);
	}catch(err){
		return "";
	}
}
