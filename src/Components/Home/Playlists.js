import React from "react";
import "./Playlists.css"
import PlaylistItem from "./PlaylistItem.js"
import PlaylistData from "./Playlists.json"

class Playlists extends React.Component {

	render(){
        return PlaylistData.map((item) => 
        (
        //     <p className="playlists">{ playlistItem.name }</p>
            <PlaylistItem playlistData={item} selected={ this.props.selectedPlaylist.id === item.id ? true : false } SelectPlaylist={this.props.SelectPlaylist}/>
        ));

	}
}

export default Playlists;

