import React from "react";
import "./Playlists.css"
import PlaylistItem from "./PlaylistItem.js"
import PlaylistData from "./Playlists.json"

class Playlists extends React.Component {

	render(){
        return PlaylistData.map((item) => 
        (
        //     <p className="playlists">{ playlistItem.name }</p>
            <PlaylistItem selected={ this.props.selectedPlaylist === item.id ? true : false } name={ item.name } id={ item.id } SelectPlaylist={this.props.SelectPlaylist}/>
        ));

	}
}

export default Playlists;

