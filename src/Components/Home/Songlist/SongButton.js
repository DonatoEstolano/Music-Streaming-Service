import React from 'react'
import './Songlist.css'
import slh from './SonglistHandler.js'

class SongButton extends React.Component {
	
	clicked = () => {
		let song = slh.getSongByID(this.props.id)
		/* TODO */
		/* This is the clicked song */
		// console.log(song)
		this.props.handleSongClick(song)
	}

	// Convert seconds to MM:SS format
    convertElapsedTime(inputSeconds){
        var seconds = Math.floor(inputSeconds % 60)
        if (seconds < 10) {
          seconds = '0' + seconds
        }
		var minutes = Math.floor(inputSeconds / 60)
        return minutes + ':' + seconds
    }

	render(){
		return (
			<button className='songButton' /* key={this.props.key} */ onClick={this.clicked}>
			<div className='title-artist-container'>
				<div className='title'>{this.props.title}</div>
				<div className='artist'>{this.props.artist}</div>
			</div>
			<div className='duration'>{this.convertElapsedTime(this.props.duration)}</div>
			</button>
		)
	}
}
export default SongButton