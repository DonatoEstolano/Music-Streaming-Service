import React from "react";
import "./player.css";
import song from "./Give You Up.mp3";
// import AudioSpectrum from "react-audio-spectrum";
// import AccountData from "../Login/Accounts.json";
import MusicData from "../../music.json";
import SeekBar from "./SeekBar"

// const divStyle = {
// 	display: 'flex',
// 	alignItems: 'center'
//   };

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      play: false,
      pause: true,
      percentage: 0,
      currentSongTime: 0,
      totalDuration: 0
    }
    this.updateSeekBar = this.updateSeekBar.bind(this)
    this.audio = new Audio(song);
    this.audio.volume = 0.2
    this.audio.ontimeupdate = this.updateSeekBar
  }

  // Updates the seekbar as the song plays
	updateSeekBar() {
    
    // Updates total song duration time if it changes
    if(this.audio.duration !== this.state.totalDuration){
        this.setState({totalDuration: this.audio.duration})
    }

    // Updates current song time if it changes
    if(this.audio.currentTime !== this.state.currentSongTime){
        this.setState({currentSongTime: this.audio.currentTime})
    }

    // Update the seekbar percent completed state
    let newPercentage = this.state.currentSongTime/this.state.totalDuration * 100.00
    if(this.state.percentage !== newPercentage.toFixed(2)){
        this.setState({ percentage: newPercentage.toFixed(2)})
    }   
}

  play = () => {
    this.setState({ play: true, pause: false });
    console.log("Playing");
    this.audio.play();
    //this.setState({buttonImage: "./play-button.png"})
  };

  pause = () => {
    this.setState({ play: false, pause: true });
    console.log("Paused");
    this.audio.pause();
    //this.setState({buttonImage: "./pause-button.png"})
  };

  handlePrev = () => {
    console.log("prev");
    console.log({ MusicData });
    var count = 0;
    const musicData = JSON.stringify(MusicData);
    JSON.parse(musicData, (key, value) => {
      if (key === "title") {
        // console.log(value);
        count++;
      }
    });
    console.log(count);
  };

  handleNext = () => {
    console.log("next");
  };
  // setAudio = () => {
  // 	this.audio = new Audio(this.props.audio);
  // }

  render() {
    return (
      <div>
        <div className="container">
          {/* <div className="card">
            <audio id="audio-element" src={"./Give You Up.mp3"} />
            <AudioSpectrum
              id="audio-canvas"
              s
              height={200}
              width={300}
              audioId={"audio-element"}
              capColor={"red"}
              capHeight={2}
              meterWidth={2}
              meterCount={512}
              meterColor={[
                { stop: 0, color: "#f00" },
                { stop: 0.5, color: "#0CD7FD" },
                { stop: 1, color: "red" }
              ]}
              gap={4}
            /> */}
          <div style={{margin:'auto', width: 'fit-content'}}>
            <img
              src={require("./prev-button.png")}
              alt=""
              className="button"
              onClick={this.handlePrev}
            />
            {this.state.pause === true ? (
              <img
                src={require("./play-button.png")}
                alt=""
                className="playButton"
                onClick={this.play}
              />
            ) : (
              <img
                src={require("./pause-button.png")}
                alt=""
                className="playButton"
                onClick={this.pause}
              />
            )}
            <img
              src={require("./next-button.png")}
              alt=""
              className="button"
              onClick={this.handleNext}
            />
          </div>
          <div style={{margin:'auto', width:'fit-content'}}>
            <SeekBar 
              percentage={this.state.percentage}
              totalDuration={this.state.totalDuration}
              currentSongTime={this.state.currentSongTime}
            />
          </div>
          {/* </div> */}
        </div>
      </div>
    );
  }
}
export default Player;
