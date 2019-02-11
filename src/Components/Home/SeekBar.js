import React from 'react'
import Filler from './Filler.js'
import './SeekBar.css'

function SeekBar(props){
    return (
        <div className='seek-bar-container'>
            <Filler percentage={props.percentage}/>
            <input
                type='range'
                min='0'
                max='100'
                step='any'
                className='slider'
                id='myRange'
                readOnly={true}
                value={!isNaN(props.percentage) && props.percentage}
                onMouseUp={e => props.handleSeekBarChange(e.currentTarget.value)}
                onInput={e => props.handleSeekBarInput(e.currentTarget.value)}
            />
        </div>
    )
}
export default SeekBar