import React from 'react'
import AudioSpectrum from 'react-audio-spectrum'
import SH from './SongHandler.js'
import './visualizer.css'


class Visualizer extends React.Component {

	constructor(props){
		super(props)
		SH.bind(this);
	}

	state = {
		song: ""
	}

	changeSong = (dir) => {
		this.setState({
			song:dir
		})
	}

	play = () => {
		this._audio.play();
	}

	pause = () => {
		this._audio.pause();
	}

	render(){
		return (
			<div className = 'visualizerDiv'>
				<audio ref={(a) => this._audio = a} id="audio-element"
					src={this.state.song}
				>
				</audio>
				<AudioSpectrum
					id="audio-canvas"
					height={200}
					width={1200}
					audioId={'audio-element'}
					capColor={'blue'}
					capHeight={2}
					meterWidth={3}
					meterCount={512}
					meterColor={[
						{stop: 0, color: '#ffffff'},
						{stop: 0.5, color: '#b4fdff'},
						{stop: 1, color: '#67fbff'}
					]}
					gap={4}
				/>			
			</div>
		)
	}
}

export default Visualizer 
