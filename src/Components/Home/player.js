import React from "react"
import "./player.css"
import song1 from "./mp3/Give You Up.mp3"
import song2 from "./mp3/Twist and Shout.mp3"
import Songlist from "./Songlist.js"
import SeekBar from "./SeekBar"

class Player extends React.Component {
    constructor(props) {
    super(props)
    this.state = {
        isPlaying: false,
        selectedPlaylist: props.selectedPlaylist,
        songList: props.songs,
        percentage: 0,
        audio: new Audio(song1),
        mp3List: [[ 'Give You Up', song1], ['Twist and Shout', song2]]
    }
        this.updateSeekBar = this.updateSeekBar.bind(this)
        this.handleSeekBarClick = this.handleSeekBarClick.bind(this)
        this.handlePlay = this.handlePlay.bind(this)
        this.handleNext = this.handleNext.bind(this)
        this.handlePrev = this.handlePrev.bind(this)
        this.setAudio = this.setAudio.bind(this)
    }

    componentDidMount(){
        // Set audio eventListeners and volume setting
        let aud = this.state.audio
        aud.preload = true
        aud.volume = 0.2
        aud.ontimeupdate = this.updateSeekBar
        aud.ondurationchange = this.updateSeekBar
        aud.onended = this.pause
        this.setState({audio: aud})
    }

    setAudio(songTitle){
        let mp3ExistsFlag = false
        for(let i = 0; i < this.state.mp3List.length; i++){
            if(songTitle === this.state.mp3List[i][0]){
                let aud = this.state.audio
                aud.src = this.state.mp3List[i][1]
                this.setState({audio: aud})
                this.state.audio.load()
                mp3ExistsFlag = true
                break
            }
        }
        if(mp3ExistsFlag === false){
            console.log("setAudio: Error: An mp3 matching this song title could not be found.")
        }
    }

    // Updates the seekbar as the song plays
	updateSeekBar(){
        if(!isNaN(this.state.audio.currentTime) && !isNaN(this.state.audio.duration)){
            // Update the seekbar percent completed state
            let newPercentage = this.state.audio.currentTime/this.state.audio.duration * 100.00
            if(this.state.percentage !== newPercentage.toFixed(2)){
                this.setState({ percentage: newPercentage.toFixed(2)})
            }
        }
    }

    handleSeekBarClick(offsetX){
        if(!isNaN(this.state.audio.duration)){
            let newSongPosition = offsetX/300
            let jumpToThisSongTime = this.state.audio.duration * newSongPosition
            this.state.audio.currentTime = jumpToThisSongTime
        }
        else{
            console.log("handleSeekBarClick: Error: No audio is loaded.")
        }
    }

    handlePlay(){
        if(this.state.audio.src !== ''){
            if(this.state.isPlaying){
                this.setState({ isPlaying: false})
                this.state.audio.currentTime === this.state.audio.duration ?
                console.log("Song Finished") : console.log("Paused")
                this.state.audio.pause()
            }
            else{
                this.setState({isPlaying: true})
                console.log("Playing")
                this.state.audio.play()
            }
        }
        else{
            console.log("handlePlay: Error: No audio is loaded.")
        }
    }

    handlePrev(){
        console.log("prev")
    }

    handleNext(){
        console.log("next")
    }

    render() {
        return (
            <div>
                <div style={{textAlign: 'center'}}>
                    <div className="cabin-text">
                        <h1>{this.props.selectedPlaylist.name}</h1>
                        <Songlist
                            songs={this.props.songs}
                            setAudio={this.setAudio}
                        />
                    </div>
                </div>
                <div className="container">
                    <div style={{margin:'auto', width: 'fit-content'}}>
                        <img src={require("./prev-button.png")} alt=""
                            className="button" onClick={this.handlePrev}/>
                        {
                            this.state.isPlaying === false ?
                            (<img src={require("./play-button.png")} alt=""
                                className="playButton" onClick={this.handlePlay}/>) :
                            (<img src={require("./pause-button.png")} alt=""
                                className="playButton" onClick={this.handlePlay}/>)
                        }
                        <img src={require("./next-button.png")} alt=""
                            className="button" onClick={this.handleNext}/>
                    </div>
                    <div style={{margin:'auto', width:'fit-content'}}>
                        <SeekBar
                            handleSeekBarClick = {this.handleSeekBarClick}
                            percentage={this.state.percentage}
                            duration={this.state.audio.duration}
                            currentTime={this.state.audio.currentTime}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
export default Player;