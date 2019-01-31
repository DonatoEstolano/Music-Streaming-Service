import React from "react";
import Playlists from "./Playlists";

class Sidebar extends React.Component {

	render(){
		return (
			<div>
				<h1>Playlists</h1>
				<Playlists />
			</div>
		);
	}
}

export default Sidebar;


