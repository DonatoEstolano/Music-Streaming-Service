import React from 'react'
import './SongButton.css'
import slh from './SonglistHandler.js'
import TimeDisplay from '../TimeDisplay.js'

class SongButton extends React.Component {
	
	clicked = () => {
		let song = slh.getSongByID(this.props.id)
		this.props.handleSongClick(song)
	}

	render(){
		return (
			<button
				className='songButton'
				/* key={this.props.key} */
				onClick={this.clicked}
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