import React from "react";
import "./Playlists.css"

class Playlists extends React.Component {

	render(){
        return (
            <p className={this.props.selected ? "playlists selectedPlaylist" : "playlists"} onClick={() => this.props.SelectPlaylist(this.props.id)}>{ this.props.name }</p>
        );
	}
}

export default Playlists;

