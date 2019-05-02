/* Full list of songs */
const fullList = require('../../../music.json');
/* playlist of songs to fetch from */
var playList = fullList.slice(0);
/* The list that can be displayed */
var songList = playList.slice(0);
/* The list that is currently displayed */
var displayList = []; 

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
	songList = 
		playList	
			.filter(song =>
				song.song.title.toLowerCase().includes(value) ||
				song.artist.name.toLowerCase().includes(value) ||
				song.artist.terms.toLowerCase().includes(value)
			)
	if(songlistDisplay) setTimeout(songlistDisplay.refresh,3000+Math.random()*1000);
}

exports.filterListByIDs = function(ids){
	if(!ids||ids.length===0)
		playList = fullList.slice(0);
	else
		playList = fullList.filter(song => 
			ids.indexOf(song.song.id) >= 0
		);
	songList = playList.slice(0);
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
exports.playList = playList;
exports.getPlaylist = function(){
	return playList;
}
