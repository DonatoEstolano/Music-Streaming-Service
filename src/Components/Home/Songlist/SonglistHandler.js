/* Full list of songs */
const fullList = require('../../../music.json');
/* The list that is currently displayed */
var displayList = []; 
/* The list that can be displayed */
var songList = fullList.slice(0);
console.log(fullList[0]);

var songlistDisplay;

exports.bind = function(display){
	songlistDisplay = display;
}

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

exports.filterList = function(value,event){
	value = value.toLowerCase();
	songList = fullList.filter(song => song.song.title.toLowerCase().includes(value));
	if(songlistDisplay) songlistDisplay.refresh();
}

exports.getSongByID = function(id){
	for(let i in fullList)
		if(fullList[i].song.id===id)
			return fullList[i];
	return null;
}

exports.songList = songList;
exports.displayList = displayList;
exports.fullList = fullList;
