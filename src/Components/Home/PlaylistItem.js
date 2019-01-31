import React from "react";
import "./Playlists.css"

class Playlists extends React.Component {

	render(){
        return (
            <p className="playlists" onClick={() => this.props.select(this.props.id)}>{ this.props.name }</p>
        );

	}
}

export default Playlists;

