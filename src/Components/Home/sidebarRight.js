import React from "react";
import Songlist from './Songlist/Songlist.js';

class SidebarRight extends React.Component {

	render(){
		return (
			<div>
				<h1>{this.props.playlistName}</h1>
				<Songlist handleSongClick={this.props.handleSongClick}></Songlist>
			</div>
		);
	}
}

export default SidebarRight;