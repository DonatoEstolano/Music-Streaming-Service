import React from "react";
import "./Songlist.css";
import slh from './SonglistHandler.js';

class SongButton extends React.Component {

	constructor(props){
		super(props);
	}

	clicked = () => {
		let song = slh.getSongByID(this.props.id);
		/* TODO */
		/* This is the clicked song */
		console.log(song);
	}

	render(){
		return (
			<button className="songButton" key={this.props.key} onClick={this.clicked}>
				{this.props.name}
			</button>
		);
	}
}

export default SongButton;


