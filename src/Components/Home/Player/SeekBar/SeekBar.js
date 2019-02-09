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
            <span className="current-time-text">{convertElapsedTime(props.currentSongTime)}</span>
            <span className="seek-bar" onClick={e=>props.handleSeekBarClick(e.nativeEvent.offsetX)}>
                <Filler 
                    percentage={props.percentage}
                    totalDuration={props.totalDuration}
                />
            </span>
            <span className="total-duration-text">{convertElapsedTime(props.totalDuration)}</span>
        </div>
    )
}

export default SeekBar