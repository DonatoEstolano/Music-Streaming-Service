import React, { Component } from 'react';
import './App.css';
import MusicData from './music.json';
import Routes from "./Routes";

class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      isAuthenticated: false,
      selectedPlaylist: {id: 0, name:"All Songs", songs: []}, //Mostly empty playlist object with ID of 0
      songs: []
    };
  }
  
  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  SelectPlaylist = playlist => {
    //Save entire object of the selected playlist into App state
    this.setState({ selectedPlaylist: playlist });
    this.setState({ songs: MusicData.filter(song => playlist.songs.includes(song.song.id)) });
  }


  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      selectedPlaylist: this.state.selectedPlaylist,
      SelectPlaylist: this.SelectPlaylist,
      songs: this.state.songs
    };

    return (
      <Routes childProps={childProps} />
    );
  }
}

export default App;
