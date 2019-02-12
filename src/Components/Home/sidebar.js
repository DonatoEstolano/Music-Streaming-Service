import React from "react";
import Playlists from "./Playlists";

class Sidebar extends React.Component {


	render(){
		return (
			<div>
				<Playlists 
					cookies={this.props.cookies} 
					SelectPlaylist={this.props.SelectPlaylist} 
					selectedPlaylist={this.props.selectedPlaylist}
					handleDeletePlaylist={this.props.handleDeletePlaylist}
					handleSubmitPlaylist={this.props.handleSubmitPlaylist}
					playlists={this.props.playlists}/>
			</div>
		);
	}
}

export default Sidebar;


