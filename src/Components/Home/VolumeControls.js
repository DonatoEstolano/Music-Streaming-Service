import React from 'react'
import './VolumeControls.css'
import SeekBar from './SeekBar.js'

function VolumeControls(props){

    function displayVolumeButton(volumePercent){
        if(volumePercent > 0 && volumePercent <= 33){
            return(
                <img
                    src={require('./volume-off.png')}
                    className='volume-button'
                    alt='Toggle Mute'
                    onClick={() => props.handleVolume(0)}
                />
            )
        }
        else if(volumePercent > 33 && volumePercent <= 66){
            return(
                <img
                    src={require('./volume-low.png')}
                    className='volume-button'
                    alt='Toggle Mute'
                    onClick={() => props.handleVolume(0)}
                />
            )
        }
        else if(volumePercent > 66 && volumePercent <= 100){
            return(
                <img
                    src={require('./volume-high.png')}
                    className='volume-button'
                    alt='Toggle Mute'
                    onClick={() => props.handleVolume(0)}
                />
            )
        }
        else{
            return(
                <img
                    src={require('./volume-mute.png')}
                    className='volume-button'
                    alt='Toggle Mute'
                    onClick={() => props.handleVolume(0)}
                />
            )
        }
    }

    return(
        <div className='volume-controls-wrapper'>
            {displayVolumeButton(props.volumePercent)}
            <div className='volume-seek-bar-container'>
                <SeekBar
                    handleSeekBarChange={props.handleVolume}
                    handleSeekBarInput={props.handleVolume}
                    percentage={props.volumePercent}
                />
            </div>
        </div>
    )
}
export default VolumeControls