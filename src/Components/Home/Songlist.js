import React from "react";
import "./Itemlists.css"
import "./Home.css";

class Songlist extends React.Component {

	render(){
        return this.props.songs.map( item => 
        (
            <p onClick={() => this.props.handleSongClick(item)}>
                { item.song.title }
            </p>
        ))
	}
}
export default Songlist