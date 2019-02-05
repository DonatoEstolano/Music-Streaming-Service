import React from "react";
import "./player.css";
import song from "./mp3/Give You Up.mp3";
// import AccountData from "../Login/Accounts.json";
import MusicData from "../../music.json";
import Songlist from "./Songlist.js";
import SeekBar from "./SeekBar"

// const divStyle = {
// 	display: 'flex',
// 	alignItems: 'center'
//   };

class Player extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
        play: false,
        pause: true,
        selectedPlaylist: props.selectedPlaylist,
        songList: props.songs,
        percentage: 0,
        currentSongTime: 0,
        totalDuration: 0
    }
        this.updateSeekBar = this.updateSeekBar.bind(this)
        this.handleSeekBarClick = this.handleSeekBarClick.bind(this)
        this.audio = new Audio(song);
        this.audio.volume = 0.2
        this.audio.ontimeupdate = this.updateSeekBar
        this.audio.onended = this.pause
    }

    // Updates the seekbar as the song plays
	updateSeekBar(){
        // Updates total song duration time if it changes
        if(this.audio.duration !== this.state.totalDuration){
            this.setState({totalDuration: this.audio.duration})
        }
        // Updates current song time if it changes
        if(this.audio.currentTime !== this.state.currentSongTime){
            this.setState({currentSongTime: this.audio.currentTime})
        }
        // Update the seekbar percent completed state
        let newPercentage = this.state.currentSongTime/this.state.totalDuration * 100.00
        if(this.state.percentage !== newPercentage.toFixed(2)){
            this.setState({ percentage: newPercentage.toFixed(2)})
        }   
    }

    handleSeekBarClick(offsetX) {
        let newSongPosition = offsetX/300
        let jumpToThisSongTime = this.state.totalDuration * newSongPosition
        this.audio.currentTime = jumpToThisSongTime
        this.setState({
            currentSongTime: jumpToThisSongTime
        })
    }

    play = () => {
        this.setState({ play: true, pause: false })
        console.log("Playing")
        this.audio.play()
    }

    pause = () => {
        this.setState({ play: false, pause: true })
        this.state.currentSongTime === this.state.totalDuration ?
            console.log("Song Finished") : console.log("Paused")
        this.audio.pause()
    }

    handlePrev = () => {
        console.log("prev")
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

    handleNext = () => {
        console.log("next")
    }

    // setAudio = () => {
    // 	this.audio = new Audio(this.props.audio);
    // }

    render() {
        return (
            <div>
                <div style={{textAlign: 'center'}}>
                    <div className="cabin-text">
                        <h1>{this.props.selectedPlaylist.name}</h1>
                        <Songlist songs={this.props.songs}/>
                    </div>
                </div>
                <div className="container">
                    <div style={{margin:'auto', width: 'fit-content'}}>
                        <img src={require("./prev-button.png")} alt=""
                            className="button" onClick={this.handlePrev}/>
                        {
                            this.state.pause === true ?
                            (<img src={require("./play-button.png")} alt=""
                                className="playButton" onClick={this.play}/>) :
                            (<img src={require("./pause-button.png")} alt=""
                                className="playButton" onClick={this.pause}/>)
                        }
                        <img src={require("./next-button.png")} alt=""
                            className="button" onClick={this.handleNext}/>
                    </div>
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