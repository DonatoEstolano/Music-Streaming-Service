import React from "react";
import "./player.css";
import song from "../mp3/Give You Up.mp3"
// import AccountData from "../Login/Accounts.json";
import MusicData from "../../../music.json";
import Songlist from "../Songlist.js";
import SeekBar from "./SeekBar/SeekBar.js"
import PlayerControls from "./PlayerControls/PlayerControls.js"

class Player extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
        isPlaying: false,
        selectedPlaylist: props.selectedPlaylist,
        songList: props.songs,
        currentSongTitle: "No song selected",
        percentage: 0,
        currentSongTime: 0,
        totalDuration: 0,
    }
        this.updateSeekBar = this.updateSeekBar.bind(this)
        this.handleSeekBarClick = this.handleSeekBarClick.bind(this)
        this.handleSongClick = this.handleSongClick.bind(this)
        this.handlePrev = this.handlePrev.bind(this)
        this.handlePlayOrPause = this.handlePlayOrPause.bind(this)
        this.handleNext = this.handleNext.bind(this)
        this.setAudio = this.setAudio.bind(this)

        this.audio = new Audio()
        this.audio.volume = 0.2
        this.audio.ontimeupdate = this.updateSeekBar
        this.audio.onended = this.handlePlayOrPause
    }

    setAudio(songTitle){
        this.setState({currentSongTitle: songTitle})

        // Temporary hardcoded audio
        this.handlePlayOrPause()
        this.audio = new Audio(song)
        this.updateSeekBar()
    }

    // Updates the seekbar as the song plays
	updateSeekBar(){
        // Updates total song duration time if it changes
        this.audio.duration !== this.state.totalDuration && this.setState({totalDuration: this.audio.duration})

        // Updates current song time if it changes
        this.audio.currentTime !== this.state.currentSongTime && this.setState({currentSongTime: this.audio.currentTime})
        
        // Update the seekbar percent completed state
        let newPercentage = this.state.currentSongTime/this.state.totalDuration * 100.00
        this.state.percentage !== newPercentage.toFixed(2) && this.setState({percentage: newPercentage.toFixed(2)})
    }

    // Sets current song time based on where you click on the seek bar
    handleSeekBarClick(offsetX){
        let newTime = this.state.totalDuration * offsetX/300
        this.audio.currentTime = newTime
        this.setState({currentSongTime: newTime})
    }

    handleSongClick(songTitle){
        console.log("songTitle: ", songTitle)
        this.setAudio(songTitle)
    }

    handlePlayOrPause(){
        if(this.state.totalDuration > 0){
            if(this.state.isPlaying === false ){
                this.setState({ isPlaying: true})
                console.log("Playing")
                this.audio.play()
            }
            else{
                this.setState({ isPlaying: false})
                console.log("Paused")
                this.audio.pause()
            }
        }
    }

    handlePrev(){
        console.log("Prev")
        console.log({ MusicData })
        var count = 0
        const musicData = JSON.stringify(MusicData)
        JSON.parse(musicData, (key, value) => {
            if (key === "title") {
                // console.log(value)
                count++
            }
        })
        console.log(count)
    }

    handleNext(){
        console.log("Next")
    }

    render() {
        return (
            <div>
                <div style={{textAlign: 'center'}}>
                    <div className="cabin-text">
                        <h1>{this.props.selectedPlaylist.name}</h1>
                        <Songlist
                            songs={this.props.songs}
                            handleSongClick = {this.handleSongClick}
                        />
                    </div>
                </div>
                <div className="container">
                    <PlayerControls
                        isPlaying = {this.state.isPlaying}
                        handlePrev = {this.handlePrev}
                        handlePlayOrPause = {this.handlePlayOrPause}
                        handleNext = {this.handleNext}
                    />
                    <div style={{margin:'auto', width:'fit-content'}}>
                        <SeekBar
                            handleSeekBarClick = {this.handleSeekBarClick}
                            percentage={this.state.percentage}
                            totalDuration={this.state.totalDuration}
                            currentSongTime={this.state.currentSongTime}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
export default Player;