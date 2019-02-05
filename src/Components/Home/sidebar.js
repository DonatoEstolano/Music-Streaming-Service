import React from "react";
import Songlist from './Songlist/Songlist.js';
import Playlists from "./Playlists";

class Sidebar extends React.Component {


	render(){
		return (
			<div>
				<Songlist></Songlist>
				<h1>Playlists</h1>
				<Playlists SelectPlaylist={this.props.SelectPlaylist} selectedPlaylist={this.props.selectedPlaylist}/>
			</div>
		);
	}
}

export default Sidebar;


