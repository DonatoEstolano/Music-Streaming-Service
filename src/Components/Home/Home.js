import React, { Component } from "react";
import "./Home.css";
import FadeIn from "react-fade-in";
import SearchField from "react-search-field";
import ToggleDisplay from "react-toggle-display";
import Sidebar from "./sidebar.js";
import Player from "./player.js";

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

  render() {
    return (
      <section className="landing">
        <div className="landing-inner-top">
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
            <Sidebar selectedPlaylist={this.props.selectedPlaylist} SelectPlaylist={this.props.SelectPlaylist}/>
          </ToggleDisplay>
          <div className="landing-inner-top-content">
              <SearchField
                classNames="landing-inner-top-searchbar"
                placeholder="Search artist or song"
              />
              <Player selectedPlaylist={this.props.selectedPlaylist} songs={this.props.songs}/>
          </div>
        </div>
      </section>
    )
  }
}
