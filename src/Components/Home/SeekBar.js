import React from "react"
import Filler from './Filler'
import "./seekbar.css"

function SeekBar(props){

    // Convert seconds to MM:SS format
    function convertElapsedTime(inputSeconds) {
        var seconds = Math.floor(inputSeconds % 60)
        if (seconds < 10) {
          seconds = "0" + seconds
        }
        var minutes = Math.floor(inputSeconds / 60)
        return minutes + ":" + seconds
    }
	
    return (
        <div>
            <span className="current-time-text">
                {isNaN(props.currentSongTime) ? convertElapsedTime(0) : convertElapsedTime(props.currentSongTime)}
            </span>
            <span className="seek-bar" onClick={e=>props.handleSeekBarClick(e.nativeEvent.offsetX)}>
                <Filler 
                    percentage={props.percentage}
                />
            </span>
            <span className="total-duration-text">
                {isNaN(props.songDuration) ? convertElapsedTime(0) : convertElapsedTime(props.songDuration)}
            </span>
        </div>
    )
}
export default SeekBar