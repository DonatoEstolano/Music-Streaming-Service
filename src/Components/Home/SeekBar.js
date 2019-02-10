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
        <div className='seek-container'>
            <div className='seek-partition-left'>
                <div className="current-time-text">
                    {isNaN(props.currentSongTime) ? convertElapsedTime(0) : convertElapsedTime(props.currentSongTime)}
                </div>
            </div>
            <div className='seek-partition-middle'>
                <div className="seek-bar">
                    <Filler 
                        percentage={props.percentage}
                    />
                    <input
                        type="range"
                        min="0"
                        max="100"
                        step='any'
                        className="slider"
                        id="myRange"
                        readOnly={true}
                        value={!isNaN(props.percentage)&& props.percentage}
                        onMouseUp={e => props.handleSeekBarChange(e.currentTarget.value)}
                        onInput={e => props.handleSeekBarInput(e.currentTarget.value)}
                    />
                </div>
            </div>
            <div className='seek-partition-right'>
                <div className="total-duration-text">
                    {isNaN(props.songDuration) ? convertElapsedTime(0) : convertElapsedTime(props.songDuration)}
                </div>
            </div>
        </div>
    )
}
export default SeekBar