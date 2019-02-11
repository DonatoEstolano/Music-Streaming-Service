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
      selectedPlaylist: {id: 0, name:"", songs: []}, //Mostly empty playlist object with ID of 0
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

  handleAddToPlaylist = song => {
    if(this.state.selectedPlaylist.id === 0) { return; }
    //Add song to currently selected playlist
    var newSongs = this.state.selectedPlaylist.songs;
    newSongs.push(song.song.id);
    console.log(song);
    console.log(MusicData.filter(song => newSongs.includes(song.song.id)));
    this.setState(prevState => ({
      selectedPlaylist: {
          ...prevState.selectedPlaylist,
          songs: newSongs
      },
      songs: MusicData.filter(song => newSongs.includes(song.song.id))
    }));
    // this.setState({ songs: MusicData.filter(song => playlist.songs.includes(song.song.id)) });
  }


  render() {
    const childProps = {
      cookies: this.props.cookies,
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      selectedPlaylist: this.state.selectedPlaylist,
      SelectPlaylist: this.SelectPlaylist,
      handleAddToPlaylist: this.handleAddToPlaylist,
      songs: this.state.songs
    };

    return (
      <Routes childProps={childProps} />
    );
  }
}

export default withCookies(App);
