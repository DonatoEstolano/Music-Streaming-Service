import React, { Component } from "react";
import "./Home.css";
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

  logout = event => {
    this.props.cookies.remove("UserName");
    this.props.userHasAuthenticated(false);
    this.props.history.push("/login"); 
  }

  data = [
    {
      key: "john",
      value: "John Doe"
    },
    {
      key: "jane",
      value: "Jane Doe"
    },
    {
      key: "mary",
      value: "Mary Phillips"
    },
    {
      key: "robert",
      value: "Robert"
    },
    {
      key: "karius",
      value: "Karius"
    }
  ];

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
          <div className="landing-inner-top-content">
              <SearchField
                classNames="landing-inner-top-searchbar"
                placeholder="Search artist or song"
              />
              <Player selectedPlaylist={this.props.selectedPlaylist} songs={this.props.songs}/>
          </div>
        </div>
      </section>
    );
  }
}
