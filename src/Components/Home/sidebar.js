import React from "react";
import Songlist from './Songlist/Songlist.js';

class Sidebar extends React.Component {

	render(){
		return (
			<div>
				<Songlist></Songlist>
			</div>
		);
	}
}

export default Sidebar;


