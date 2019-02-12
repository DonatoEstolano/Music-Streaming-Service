import React from "react";
import "./MediaControls.css";

function MediaControls(props) {
  return (
    <div className="media-controls-container">
      <img
        className="button"
        src={require("./prev-button.png")}
        alt="Previous"
        onClick={props.handlePrevious}
      />
      {props.isPlaying === false ? (
        <img
          src={require("./play-button.png")}
          alt="Play"
          className="play-button"
          onClick={props.handlePlay}
        />
      ) : (
        // Ternary
        <img
          src={require("./pause-button.png")}
          alt="Pause"
          className="play-button"
          onClick={props.handlePlay}
        />
      )}
      <img
        className="button"
        src={require("./next-button.png")}
        alt="Next"
        onClick={props.handleNext}
      />
    </div>
  );
}
export default MediaControls;
