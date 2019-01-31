import React from "react";
import "./Playlists.css"
import PlaylistItem from "./PlaylistItem.js"
import PlaylistData from "./Playlists.json"

class Playlists extends React.Component {

    Select(id) {
        console.log(id);
    }

	render(){
        return PlaylistData.map((playlistItem) => 
        (
        //     <p className="playlists">{ playlistItem.name }</p>
            <PlaylistItem name={ playlistItem.name } id={ playlistItem.id } select={this.Select}/>
        ));

	}
}

export default Playlists;

