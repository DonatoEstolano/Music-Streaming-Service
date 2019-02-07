import React from "react";
import Playlists from "./Playlists";

class Sidebar extends React.Component {


	render(){
		return (
			<div>
				<Playlists cookies={this.props.cookies} SelectPlaylist={this.props.SelectPlaylist} selectedPlaylist={this.props.selectedPlaylist}/>
			</div>
		);
	}
}

export default Sidebar;


