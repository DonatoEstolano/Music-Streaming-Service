import React from "react";
import "./Itemlists.css"

class Playlists extends React.Component {

	render(){
        return (
            <p className={this.props.selected ? "item-list item-selected" : "item-list"} onClick={() => this.props.SelectPlaylist(this.props.playlistData)}>{ this.props.playlistData.name }</p>
        );
	}
}

export default Playlists;

