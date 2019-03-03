const streamURL = 'http://ponceplayer.com/mp3';
var currentSong = new Audio();
var currentSongInfo = {};
var songQueue = [];
var queueLoc = 0;
var player;
var playing = false;

var timeUpdateEventListener = [
	"timeupdate",
	() => player.setState({
		currentSongTime: this.getCurrentTime(),
		percentage: this.getCurrentPercent()
	})
];
var hasTimeUpdateListener = false;

/* Bind to player */
exports.bind = function(bplayer){
	player = bplayer;
    currentSong.preload = "metadata";
    currentSong.volume = player.state.volumePercent / 100;
    currentSong.onloadedmetadata = () => player.updateDuration(this.getCurrentDuration());
    currentSong.addEventListener(...timeUpdateEventListener);
	hasTimeUpdateListener = true;
    currentSong.ondurationchange = () => player.updateDuration(this.getCurrentDuration());
    currentSong.onended = () => this.nextSong();
}

/* Update current song and playlist */
exports.updateSong = function(song,playlist){
	currentSong.pause();
	currentSong.src = streamURL; /* TODO */
	currentSong.currentTime = 0;
	currentSong.play();
	playing = true;
	if(player) player.setState({
		songDuration: currentSong.duration,
		songTitle:song.song.title,
		artistName:song.artist.name,
		songID:song.song.id,
		isPlaying:playing
	});
	if(playlist){
		songQueue = playlist;
		for(let i=0;i<songQueue.length;i++){
			if(songQueue[i].song.id==song.song.id){
				currentSongInfo = song;
				queueLoc = i;
				return;
			}
		}
	}
}

/* Pause/Plays the song */
exports.play = function(){
	playing = !playing;
    if(player) player.setState({ isPlaying: playing});
	if(playing) currentSong.play();
	else currentSong.pause();
}

exports.removeTimeListener = function(){
	if(hasTimeUpdateListener){
		currentSong.removeEventListener(...timeUpdateEventListener);
		hasTimeUpdateListener = false;
	}
}

/* jumps to a specific time */
exports.jump = function(percent){
	if(!hasTimeUpdateListener){
		currentSong.addEventListener(...timeUpdateEventListener);
		hasTimeUpdateListener = true;
	}
	percent = (percent/100) * this.getCurrentDuration();
	if(currentSong) currentSong.currentTime = percent;
}

/* Plays the next song */
exports.nextSong = function(){
	queueLoc = (queueLoc+1)%songQueue.length;
	this.updateSong(songQueue[queueLoc]);
}

/* Plays the previous song */
exports.prevSong = function(){
	queueLoc--;
	if(queueLoc<0) queueLoc = songQueue.length-1;
	this.updateSong(songQueue[queueLoc]);
}

/* Current time of music */
exports.getCurrentTime = function(){
	if(!currentSong) return;
	return currentSong.currentTime;
}

/* Get percentage of music time */
exports.getCurrentPercent = function(){
	if(!currentSong) return;
    return (currentSong.currentTime / currentSong.duration) * 100;
}

/* Get current song audio */
exports.getCurrentSong = function(){
	if(!currentSong) return;
	return currentSong;
}

/* Get current song duration */
exports.getCurrentDuration = function(){
	if(!currentSong) return;
	return currentSong.duration;
}

/* get current song id */
exports.getCurrentID = function(){
	if(!currentSong) return;
	return currentSongInfo.song.id;
}

/* sets the volume */
exports.setVolume = function(vol){
	if(!currentSong) return;
	currentSong.volume = vol/100;

}
