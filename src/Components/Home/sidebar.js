import React from "react";
<<<<<<< HEAD
import Songlist from './Songlist/Songlist.js';
=======
import Playlists from "./Playlists";
>>>>>>> master

class Sidebar extends React.Component {


	render(){
		return (
			<div>
<<<<<<< HEAD
				<Songlist></Songlist>
=======
				<h1>Playlists</h1>
				<Playlists SelectPlaylist={this.props.SelectPlaylist} selectedPlaylist={this.props.selectedPlaylist}/>
>>>>>>> master
			</div>
		);
	}
}

export default Sidebar;


