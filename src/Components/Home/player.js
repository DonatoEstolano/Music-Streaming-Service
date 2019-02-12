import React from "react";
import "./player.css";
import "./Itemlists.css";
import AudioSeekBar from "./AudioSeekBar.js";
import MediaControls from "./MediaControls.js";
import VolumeControls from "./VolumeControls.js";

import song1 from "./mp3/Soul Deep.mp3";
import song2 from "./mp3/Twist and Shout.mp3";
import song3 from "./mp3/I Didn't Mean To.mp3";
import TimeDisplay from "./TimeDisplay";

const mp3List = [
  ["Soul Deep", song1],
  ["Twist and Shout", song2],
  ["I Didn't Mean To", song3]
];

class Player extends React.Component {
  state = {
    isPlaying: false,
    percentage: 0,
    songDuration: 0,
    currentSongTime: 0,
    audio: new Audio(),
    volumePercent: 50,
    songTitle: "Song Title",
    artistName: "Artist",
    songID: "-1",
    playlist: [],
    counter: 0
  };

  bookmarkSong = this.bookmarkSong.bind(this);

  hasOnTimeUpDateListener = false;
  timeUpdateEventListener = [
    "timeupdate",
    () =>
      this.setState({
        currentSongTime: this.state.audio.currentTime,
        percentage:
          (this.state.audio.currentTime / this.state.audio.duration) * 100
      })
  ];

  // Sets audio eventListeners when component is created
  componentDidMount() {
    let aud = this.state.audio;
    aud.preload = "metadata";
    aud.volume = this.state.volumePercent / 100;
    aud.onloadedmetadata = () =>
      this.setState({ songDuration: this.state.audio.duration });
    aud.addEventListener(...this.timeUpdateEventListener);
    aud.ondurationchange = () =>
      this.setState({ songDuration: this.state.audio.duration });
    aud.onended = () => this.handlePlay();
    this.setState({ audio: aud });
    this.hasOnTimeUpDateListener = true;
  }

  // Runs if a prop was updated.
  // Triggers setAudio when the songInfo state in Home is changed
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.songInfo !== this.props.songInfo &&
      this.props.songInfo !== null
    ) {
      console.log(this.props.songInfo.song.title);
      this.setState({
        songTitle: this.props.songInfo.song.title,
        artistName: this.props.songInfo.artist.name,
        songID: this.props.songInfo.song.id
      });
      this.setAudio();
    }
  }

  // Sets audio object src to an imported mp3 that matches songTitle
  setAudio = () => {
    this.resetState();
    console.log(this.state.playlist);
    if (this.props.songs.length !== 0) {
      const stringData = JSON.stringify(this.props.songs);
      JSON.parse(stringData, (key, value) => {
        if (key === "title") {
          this.setState(previousState => ({
            playlist: [...previousState.playlist, value]
          }));
        }
      });
    }
    let mp3ExistsFlag = false;
    for (let i = 0; i < mp3List.length; i++) {
      if (this.props.songInfo.song.title === mp3List[i][0]) {
        let aud = this.state.audio;
        aud.src = mp3List[i][1];
        this.setState({
          audio: aud,
          currentSongTime: aud.currentTime,
          songDuration: aud.duration,
          percentage: 0,
          isPlaying: false
        });
        this.state.audio.load();
        this.setState({
          counter: this.state.playlist.indexOf(this.props.songInfo.song.title)
        });
        console.log(
          this.state.playlist.indexOf(this.props.songInfo.song.title)
        );
        mp3ExistsFlag = true;
        break;
      }
    }
    if (mp3ExistsFlag === false) {
      console.log(
        "setAudio Error: No mp3 with the title: ",
        this.props.songInfo.song.title
      );
    }
  };

  // Removes the timeUpdate event listener from the audio object to prevent the
  // seek bar from constantly rendering to track the elapsed playing time of the song.
  // This allows the user to smoothly move the seek bar thumb to their desired position.
  handleAudioSeekBarInput = newSongPercent => {
    if (this.hasOnTimeUpDateListener) {
      this.state.audio.removeEventListener(...this.timeUpdateEventListener);
      this.hasOnTimeUpDateListener = false;
    }
    if (!isNaN(this.state.audio.duration)) {
      let newCurrentSongTime =
        (newSongPercent / 100.0) * this.state.audio.duration;
      this.setState({
        currentSongTime: newCurrentSongTime,
        percentage: newSongPercent
      });
    } else {
      console.log("handleSeekBarInput: Error: this.state.audio.duration = NaN");
    }
  };

  // Jumps audio to new currentTime upon mouseUp event from seekbar.
  // Adds the timeUpdate event listener back to the audio object if it was removed during seekbar scrubbing.
  handleAudioSeekBarChange = newSongPercent => {
    if (!this.hasOnTimeUpDateListener) {
      this.state.audio.addEventListener(...this.timeUpdateEventListener);
      this.hasOnTimeUpDateListener = true;
    }
    if (!isNaN(this.state.audio.duration)) {
      let newCurrentSongTime =
        (newSongPercent / 100.0) * this.state.audio.duration;
      let aud = this.state.audio;
      aud.currentTime = newCurrentSongTime;
      this.setState({
        audio: aud,
        percentage: newSongPercent
      });
    } else {
      console.log(
        "handleSeekBarChange: Error: this.state.audio.duration = NaN"
      );
    }
  };

  handleVolume = newVolumePercent => {
    let aud = this.state.audio;
    aud.volume = newVolumePercent / 100;
    this.setState({
      audio: aud,
      volumePercent: newVolumePercent
    });
  };

  handlePlay = () => {
    if (this.state.audio.src !== "") {
      if (this.state.isPlaying) {
        this.setState({ isPlaying: false });
        this.state.audio.currentTime === this.state.audio.duration
          ? console.log("Song Finished")
          : console.log("Paused");
        this.state.audio.pause();
      } else {
        this.setState({ isPlaying: true });
        console.log("Playing");
        this.state.audio.play();
      }
    } else {
      console.log("handlePlay: Error: No audio is loaded.");
    }
    console.log(this.state.counter);
  };

  handlePrevious = () => {
    console.log("prev");
    let aud = this.state.audio;
    if (this.state.counter === 0 || this.state.audio.currentTime > 5) {
      aud.currentTime = 0;
      this.setState({ audio: aud });
      this.state.audio.play();
    } else {
      aud.src = mp3List[this.state.counter - 1][1];
      this.setState({ audio: aud, counter: this.state.counter - 1 });
      this.state.audio.pause();
      this.state.audio.load();
      this.state.audio.play();
    }
  };

  handleNext = () => {
    var count = this.state.counter + 1;
    let aud = this.state.audio;
    if (count === this.state.playlist.length) {
      aud.src = mp3List[0][1];
      this.setState({ audio: aud });
      this.state.audio.load();
    } else {
      aud.src = mp3List[this.state.counter][1];
      this.setState({ audio: aud, counter: count });
      this.state.audio.load();
      this.state.audio.play();
    }
    this.changeAudioInfo();
  };

  changeAudioInfo = () => {
    this.setState({
      songTitle: this.props.songInfo.song.title,
      artistName: this.props.songInfo.artist.name,
      songID: this.props.songInfo.song.id
    });
  };
  bookmarkSong() {
    this.props.bookmarkSong(this.state.songID);
  }

  resetState = () => {
    this.setState({ playlist: [], counter: 0, audio: null });
  };

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
          <div className="song-info-artist">{this.state.artistName}</div>
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
