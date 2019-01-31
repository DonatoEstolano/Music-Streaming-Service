import React from "react";
import './player.css';
import song from "./Give You Up.mp3";
import AudioSpectrum from 'react-audio-spectrum';

class Player extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			play: false,
			pause: true,
		}
		this.audio = new Audio(song);
	}

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

export default Player;


