import React, { Component } from 'react';
import './App.css';
import MusicData from './music.json';
import Routes from "./Routes";
import { withCookies } from 'react-cookie';

class App extends Component {


  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
    };

  }
  
  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }


  render() {
    const childProps = {
      cookies: this.props.cookies,
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      selectedPlaylist: this.state.selectedPlaylist,
      SelectPlaylist: this.SelectPlaylist,
      MusicData: MusicData
    };

    return (
      <Routes childProps={childProps} />
    );
  }
}

export default withCookies(App);
