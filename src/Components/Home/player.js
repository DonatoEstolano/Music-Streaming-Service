import React from "react";
import './player.css';
import song from "./Give You Up.mp3";


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
			<div className="player">
					<img src={require("./play-button.png")} alt ="" className="button" onClick={this.play}></img>
					<img src={require("./pause-button.png")} alt = "" className="button" onClick={this.pause}></img>
			</div>
		);
	}
}

export default Player;


