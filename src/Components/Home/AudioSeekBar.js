import React from 'react'
import './AudioSeekBar.css'
import SeekBar from './SeekBar.js'
import TimeDisplay from './TimeDisplay.js'

function AudioSeekBar(props){
    return(
        <div className='audio-seek-bar-container'>
            <div className='audio-seek-bar-container-left'>
                <TimeDisplay time={props.currentSongTime}/>
            </div>
            <div className='audio-seek-bar-container-middle'>
                <SeekBar
                    handleSeekBarChange={props.handleAudioSeekBarChange}
                    handleSeekBarInput={props.handleAudioSeekBarInput}
                    percentage={props.percentage}
                />
            </div>
            <div className='audio-seek-bar-container-right'>
                <TimeDisplay time={props.songDuration}/>
            </div>
        </div>
    )
}
export default AudioSeekBar