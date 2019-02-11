import React from 'react'
import './TimeDisplay.css'

function TimeDisplay(props){
    function convertElapsedTime(inputSeconds){
        var seconds = Math.floor(inputSeconds % 60)
        if (seconds < 10) {
          seconds = '0' + seconds
        }
        var minutes = Math.floor(inputSeconds / 60)
        let formattedTimeString = minutes + ':' + seconds
        return formattedTimeString
    }

    return(
        <div className="time-display">
            {isNaN(props.time) ? '0:00' : convertElapsedTime(props.time)}
        </div>
    )
}
export default TimeDisplay