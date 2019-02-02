import React from "react";
import "./Home.css";

class Songlist extends React.Component {

	render(){
        return this.props.songs.map((item) => 
        (
            <p>{ item.song.title }</p>
        ));

	}
}

export default Songlist;

