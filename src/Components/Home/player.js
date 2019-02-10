import React from 'react'
import './player.css'
import SeekBar from './SeekBar'

import song1 from './mp3/Give You Up.mp3'
import song2 from './mp3/Twist and Shout.mp3'

const mp3List = [[ 'Give You Up', song1], ['Twist and Shout', song2]]

class Player extends React.Component {
    state = {
        isPlaying: false,
        percentage: 0,
        songDuration: 0,
        currentSongTime: 0,
        audio: new Audio(song1),
        songTitle: 'Song Title',
        artistName: 'Artist'
    }

    hasOnTimeUpDateListener = false;
    timeUpdateEventListener = ['timeupdate', () => this.setState({currentSongTime: this.state.audio.currentTime,
        percentage: this.state.audio.currentTime/this.state.audio.duration * 100})]
        
    // Set audio eventListeners
    componentDidMount(){
        let aud = this.state.audio
        aud.preload = 'metadata'
        aud.volume = 0.02
        aud.onloadedmetadata = () => this.setState({songDuration: this.state.audio.duration})
        aud.addEventListener(...this.timeUpdateEventListener)
        aud.ondurationchange = () => this.setState({songDuration: this.state.audio.duration})
        aud.onended = () => this.handlePlay()
        this.setState({audio: aud})
        this.hasOnTimeUpDateListener = true;
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.songInfo!==this.props.songInfo &&  this.props.songInfo!==null){
            console.log(this.props.songInfo.song.title)
            this.setState({
                songTitle: this.props.songInfo.song.title,
                artistName: this.props.songInfo.artist.name
            })
            this.setAudio(this.props.songInfo.song.title)
        }
    }

    setAudio = (songTitle) => {
        let mp3ExistsFlag = false
        for(let i = 0; i < mp3List.length; i++){
            if(songTitle === mp3List[i][0]){
                let aud = this.state.audio
                aud.src = mp3List[i][1]
                this.setState({
                    audio: aud,
                    currentSongTime: aud.currentTime,
                    songDuration:  aud.duration,
                    percentage: 0,
                    isPlaying: false
                })
                this.state.audio.load()
                mp3ExistsFlag = true
                break
            }
        }
        if(mp3ExistsFlag === false){
            console.log('setAudio: Error: No mp3 with the title: ', songTitle)
        }
    }

    isSongInfoValid = () => {
        if(this.props.songInfo!=='null'){
            console.log('songvalidchecker')
            return true
        }
    }

    // Jumps audio to new currentTime upon mouseUp event from seekbar.
    // Adds the timeUpdate event listener back to the audio object if it was removed during seekbar scrubbing.
    handleSeekBarChange = songPercent => {
        if(!this.hasOnTimeUpDateListener){
            this.state.audio.addEventListener(...this.timeUpdateEventListener)
            this.hasOnTimeUpDateListener = true
        }
        if(!isNaN(this.state.audio.duration)){
            let newCurrentSongTime = songPercent/100.0 * this.state.audio.duration
            let aud = this.state.audio
            aud.currentTime = newCurrentSongTime
            this.setState({
                audio: aud,
                percentage: songPercent
            })
        }
        else{
            console.log('handleSeekBarChange: Error: this.state.audio.duration = NaN')
        }
    }

    // Removes the timeUpdate event listener from the audio object so user can smoothly drag seekbar thumb
    // without the seekbar trying to simultaneously display the actual position of the song
    handleSeekBarInput = songPercent => {
        if(this.hasOnTimeUpDateListener){
            this.state.audio.removeEventListener(...this.timeUpdateEventListener)
            this.hasOnTimeUpDateListener = false
        }
        if(!isNaN(this.state.audio.duration)){
            let newCurrentSongTime = songPercent/100.0 * this.state.audio.duration
            this.setState({
                currentSongTime: newCurrentSongTime,
                percentage: songPercent
            })
        }
        else{
            console.log('handleSeekBarInput: Error: this.state.audio.duration = NaN')
        }
    }

    handleVolumeInput = () => {

    }

    handlePlay = () => {
        if(this.state.audio.src !== ''){
            if(this.state.isPlaying){
                this.setState({ isPlaying: false})
                this.state.audio.currentTime === this.state.audio.duration ?
                console.log('Song Finished') : console.log('Paused')
                this.state.audio.pause()
            }
            else{
                this.setState({isPlaying: true})
                console.log('Playing')
                this.state.audio.play()
            }
        }
        else{
            console.log('handlePlay: Error: No audio is loaded.')
        }
    }

    handlePrev = () => {
        console.log('prev')
    }

    handleNext = () => {
        console.log('next')
    }

    render() {
        return (
            <div>
                <div className='media-container'>
                    <div className='media-container-info'>
                        <div className='song-title-text'>{this.state.songTitle}</div>
                        <div className='song-artist-text'>{this.state.artistName}</div>
                    </div>
                    <div className='media-container-controls-seekbar'>
                        <div className='controls-container'>
                            <img src={require('./prev-button.png')} alt='' className='button' onClick={this.handlePrev}/>
                                {this.state.isPlaying === false ?
                                    <img src={require('./play-button.png')} alt='' className='playButton' onClick={this.handlePlay}/> :
                                    <img src={require('./pause-button.png')} alt='' className='playButton' onClick={this.handlePlay}/>
                                }
                            <img src={require('./next-button.png')} alt=''className='button' onClick={this.handleNext}/>
                        </div>
                        <div className='seek-container'>
                            <SeekBar
                                handleSeekBarChange={this.handleSeekBarChange}
                                handleSeekBarInput={this.handleSeekBarInput}
                                percentage={this.state.percentage}
                                songDuration={this.state.songDuration}
                                currentSongTime={this.state.currentSongTime}
                            />
                        </div>
                    </div>
                    <div className='media-container-volume'>
                        VOLUME  CONTROL
                    </div>
                </div>
            </div>
        )
    }
}
export default Player;