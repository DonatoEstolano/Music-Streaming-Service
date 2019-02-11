import React from 'react'
import './Songlist.css'
import "../Itemlists.css"
import slh from './SonglistHandler.js'

class SongButton extends React.Component {
	
	clicked = () => {
		let song = slh.getSongByID(this.props.id)
		/* TODO */
		/* This is the clicked song */
		// console.log(song)
		this.props.handleSongClick(song)
	}

	handleAddToPlaylist = () => {
		let song = slh.getSongByID(this.props.id)
		this.props.handleAddToPlaylist(song);
	}

	render(){
		return (
			<div>
				<button className='songButton' key={this.props.key} onClick={this.clicked}>
					{this.props.name}
				</button>
				<i className="fa fa-sign-in clickable" onClick={this.handleAddToPlaylist} />
			</div>
		)
	}
}
export default SongButton