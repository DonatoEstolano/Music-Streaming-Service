import React from 'react'
import './SongButton.css'
import slh from './SonglistHandler.js'
import TimeDisplay from '../TimeDisplay.js'
import APH from '../Player/AudioPlayerHandler.js'

class SongButton extends React.Component {

	constructor(props){
		super(props);
		APH.bindSongButton(this);
	}

	state = {
		style: {
			outline: 'none',
			'background-color': "transparent"
		}
	}

	resetHighlight=()=>{
		this.setState({
			style:{
				'outline':'none',
				'background-color':'transparent'
			}});
	}
	
	clicked = () => {
		let song = slh.getSongByID(this.props.id);
		let playlist = slh.getPlaylist();
		APH.updateSong(song,playlist);
	}

	render(){
		return (
			<button
				className='songButton'
				/* key={this.props.key} */
				onClick={this.clicked}
				style={this.state.style}
			>
				<div className='title-artist-container'>
					<div className='title'>{this.props.title}</div>
					<div className='artist'>{this.props.artist}</div>
				</div>
				<div className='duration'>
					<TimeDisplay time={this.props.duration}/>
				</div>
			</button>
		)
	}
}
export default SongButton
