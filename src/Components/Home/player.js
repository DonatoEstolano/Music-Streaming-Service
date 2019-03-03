import React from "react";
import "./player.css";
import "./Itemlists.css";
import AudioSeekBar from "./AudioSeekBar.js";
import MediaControls from "./MediaControls.js";
import VolumeControls from "./VolumeControls.js";
import APH from "./Player/AudioPlayerHandler.js";
import TimeDisplay from "./TimeDisplay";

class Player extends React.Component {

	constructor(props){
		super(props)
		APH.bind(this)
		this.handleVolume(50);
	}

	state = {
		isPlaying: false,
		percentage: 0,
		songDuration: 0,
		currentSongTime: 0,
		volumePercent: 50,
		songTitle: "Song Title",
		artistName: "Artist",
		songID: "-1",
	};

	bookmarkSong = this.bookmarkSong.bind(this);
	deleteSong = this.deleteSong.bind(this);

	/* Update current duration bar */
	updateDuration(dur){
		this.setState({songDuration:dur});
	}

	// Removes the timeUpdate event listener from the audio object to prevent the
	// seek bar from constantly rendering to track the elapsed playing time of the song.
	// This allows the user to smoothly move the seek bar thumb to their desired position.
	handleAudioSeekBarInput = newSongPercent => {
		APH.removeTimeListener ();
		this.setState({percentage: newSongPercent});
	};

	// Jumps audio to new currentTime upon mouseUp event from seekbar.
	// Adds the timeUpdate event listener back to the audio object if it was removed during seekbar scrubbing.
	handleAudioSeekBarChange = newSongPercent => {
		APH.jump(newSongPercent);
		this.setState({percentage: newSongPercent});
	};


  	/* Handles audio information */
	handleVolume = newVolumePercent => {
		APH.setVolume(newVolumePercent);
		this.setState({
			volumePercent: newVolumePercent
		});
	};
	handlePlay = () => {APH.play();};
	handlePrevious = () => {APH.prevSong();};
	handleNext = () => {APH.nextSong();}

	/* Handles playlists */
	bookmarkSong() {this.props.bookmarkSong(APH.getCurrentID());}
	deleteSong() {this.props.deleteSong(APH.getCurrentID());}

  render() {
    return (
      <div className="media-container">
        <div className="song-info-container">
          <div className="song-info-title">
            <i
              className="fa fa-bookmark clickable"
              onClick={this.bookmarkSong}
            />{" "}
            {this.state.songTitle}
          </div>
          <div className="song-info-artist">
            <i className="fa fa-trash clickable" onClick={this.deleteSong} />{" "}
            {this.state.artistName}
          </div>
        </div>
        <div className="media-controls-audio-seek-bar-container">
          <MediaControls
            isPlaying={this.state.isPlaying}
            handlePlay={this.handlePlay}
            handlePrevious={this.handlePrevious}
            handleNext={this.handleNext}
          />
          <AudioSeekBar
            currentSongTime={this.state.currentSongTime}
            songDuration={this.state.songDuration}
            percentage={this.state.percentage}
            handleAudioSeekBarChange={this.handleAudioSeekBarChange}
            handleAudioSeekBarInput={this.handleAudioSeekBarInput}
          />
        </div>
        <div className="volume-controls-container">
          <VolumeControls
            handleVolume={this.handleVolume}
            volumePercent={this.state.volumePercent}
          />
        </div>
      </div>
    );
  }
}
export default Player;
