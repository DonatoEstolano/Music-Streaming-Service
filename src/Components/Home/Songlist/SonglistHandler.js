/* Full list of songs */
const fullList = require('../../../music.json');
/* The list that is currently displayed */
var displayList = []; 
/* The list that can be displayed */
var songList = fullList.slice(0);

exports.displaySongs = function(start,length){
	displayList = songList.slice(start,start+length);
	return displayList;
}

exports.extendDisplay = function(length){
	displayList = displayList.concat(songList.slice(0,length));
	console.log(displayList);
	return displayList;
}

exports.hasMore = function(){
	return displayList.length<songList.length;
}

exports.clearDisplay = function(){
	displayList = [];
	return displayList;
}

exports.songList = songList;
exports.displayList = displayList;
exports.fullList = fullList;
