import React from 'react'

function PlayerControls(props){
    return(
        <div>
            <div style={{margin:'auto', width: 'fit-content'}}>
                <img 
                    src={require("./prev-button.png")}
                    alt="Previous Song" className="button"
                    onClick={props.handlePrev}
                />
                {props.isPlaying === false ?
                    <img
                        src={require("./play-button.png")}
                        alt="Play"
                        className="playButton"
                        onClick={props.handlePlayOrPause}
                    />
                    : 
                    <img
                        src={require("./pause-button.png")}
                        alt="Pause"
                        className="playButton"
                        onClick={props.handlePlayOrPause}
                    />
                }
                <img 
                    src={require("./next-button.png")}
                    alt="Next Song"
                    className="button"
                    onClick={props.handleNext}
                />
            </div>
        </div>
    )
}
export default PlayerControls