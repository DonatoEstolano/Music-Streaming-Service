import React from "react";
import Songlist from './Songlist/Songlist.js';

class SidebarRight extends React.Component {


	render(){
		return (
			<div>
				<h1>Song List</h1>
				<Songlist></Songlist>
			</div>
		);
	}
}

export default SidebarRight;


