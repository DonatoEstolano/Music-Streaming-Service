import React from "react";
import "./player.css";
import song from "./Give You Up.mp3";
<<<<<<< HEAD
import AudioSpectrum from 'react-audio-spectrum';
=======
import AudioSpectrum from "react-audio-spectrum";
import AccountData from "../Login/Accounts.json";

// const divStyle = {
// 	display: 'flex',
// 	alignItems: 'center'
//   };
>>>>>>> 066b02b8d3c1352baa743c468a011dd64d6b6011

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      play: false,
      pause: true
    };
    this.audio = new Audio(song);
  }

<<<<<<< HEAD
	play = () => {
		this.setState({play: true, pause: false})
			console.log("play");
			this.audio.play();
			//this.setState({buttonImage: "./play-button.png"})
		}
		
	pause = () => {
		this.setState({play: false, pause: true})
			console.log("Pause");
			this.audio.pause();
			//this.setState({buttonImage: "./pause-button.png"})
		}

	render(){
		return (
			<div>
				hello
				<audio id="audio-element" src="./Give You Up.mp3"></audio>
				{/* <audio controls>
					<source src="horse.ogg" type="audio/ogg">
					<source src="horse.mp3" type="audio/mpeg">
				</audio> */}
				{/* <AudioSpectrum id="audio-canvas"
								height="200"
								width="300"
								audioId="audio-element"
								capColor="red"
								capHeight="2"
								meterWidth="2"
								meterCount="512"
								meterColor={[
									{stop: 0, color: '#f00'},
									{stop: 0.5, color: '#0CD7FD'},
									{stop: 1, color: 'red'}
									]}
								gap="4"
				/> */}
				<AudioSpectrum audioId="audio-element" height="200px" width="300px"></AudioSpectrum>
			</div>
		);
	}
}
=======
  play = () => {
    this.setState({ play: true, pause: false });
    console.log("play");
    this.audio.play();
    //this.setState({buttonImage: "./play-button.png"})
  };

  pause = () => {
    this.setState({ play: false, pause: true });
    console.log("Pause");
    this.audio.pause();
    //this.setState({buttonImage: "./pause-button.png"})
  };

  handlePrev = () => {
    console.log("prev");
    console.log({ AccountData });
    const accountData = JSON.stringify(AccountData);
    JSON.parse(accountData, (key, value) => {
      if (key === "username") {
        console.log(value);
      }
    });
  };

  handleNext = () => {
    console.log("next");
  };
  // setAudio = () => {
  // 	this.audio = new Audio(this.props.audio);
  // }
>>>>>>> 066b02b8d3c1352baa743c468a011dd64d6b6011

  render() {
    return (
      <div>
        <div className="container">
          <div className="card">
            <audio id="audio-element" src={this.audio} />
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
            />
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
        </div>
      </div>
    );
  }
}
export default Player;
