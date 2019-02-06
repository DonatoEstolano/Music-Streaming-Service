import React, { Component } from "react";
import "./Home.css";
import SearchField from "react-search-field";
import ToggleDisplay from "react-toggle-display";
import Sidebar from "./sidebar.js";
import SidebarRight from "./sidebarRight.js";
import Player from "./player.js";
import SLH from './Songlist/SonglistHandler.js';

export default class Home extends Component {
  constructor() {
    super();
    this.state = { show: false };
  }

  handleClick() {
    this.setState({
      show: !this.state.show
    });
  }

logout = event => {
  this.props.cookies.remove("UserName");
  this.props.userHasAuthenticated(false);
  this.props.history.push("/login"); 
}
  render() {
    return (
      <section className="landing">
        <div className="landing-inner-top">
        <h4 id="name">Welcome {this.props.cookies.get("UserName")}</h4>
          <nav className="landing-inner-top-nav">
            <div
              onClick={() => this.handleClick()}
              className="landing-inner-top-nav-container"
            >
              <div className="container-bar" />
              <div className="container-bar" />
              <div className="container-bar" />
            </div>
          </nav>
          <ToggleDisplay
            tag="div"
            show={this.state.show}
            className="playlist-container"
          >
            
            <h4 className="logout-btn" onClick={this.logout}>Logout</h4>
            <Sidebar selectedPlaylist={this.props.selectedPlaylist} SelectPlaylist={this.props.SelectPlaylist}/>
          </ToggleDisplay>
	  <div className="playlist-container-right">
	    <SidebarRight />
	  </div>
          <div className="landing-inner-top-content">
              <SearchField
                classNames="landing-inner-top-searchbar"
                placeholder="Search artist or song"
	    	onChange={SLH.filterList}
              />
              <Player selectedPlaylist={this.props.selectedPlaylist} songs={this.props.songs}/>
          </div>
        </div>
      </section>
    )
  }
}
