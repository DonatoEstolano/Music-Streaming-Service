import React, { Component } from 'react';
import './App.css';
import MusicData from './music.json';
import Routes from "./Routes";
import { withCookies } from 'react-cookie';

class App extends Component {


  constructor(props) {
    super(props);

    this.readPlaylists = this.readPlaylists.bind(this);
    this.writePlaylists = this.writePlaylists.bind(this);
    this.handleSubmitPlaylist = this.handleSubmitPlaylist.bind(this);

    this.state = {
      isAuthenticated: false,
      selectedPlaylist: {id: 0, name:"", songs: []}, //Mostly empty playlist object with ID of 0
      playlists: [],
      songs: []
    };

    this.readPlaylists();
  }

  readPlaylists() {

    function getPlaylistData(){ //calls the server
      return Promise.all([fetch('http://localhost:5000/playlist_data').then(response => response.json())]) //gets the json object
    }

    getPlaylistData().then(([PlaylistData])=> { //then keyword waits until the json data is loaded
        
      this.setState({ 
        playlists: PlaylistData
      });

    });
  }

  writePlaylists() {
    fetch('http://localhost:5000/add_playlist',{
      method: 'POST',
      body: JSON.stringify(this.state.playlists), //Send updated playlists to server
      headers: {"Content-Type": "application/json"}
    });

  }

  getLargestID() {
    if (this.state.playlists === undefined || this.state.playlists.length === 0) {// array empty or does not exist
      return 0;
    }
    var largest = Math.max.apply(Math, this.state.playlists.map(playlist => { return playlist.id; }));
    if (largest == null)
    {
      largest = 0;
    }
    return largest; //get the largest ID in the file and return it
  }

  handleSubmitPlaylist = newPlaylist => {
    this.setState(prevState => ({
      playlists: [...prevState.playlists, {"user": this.props.cookies.get("UserName"),
                                        "id" : this.getLargestID() + 1,
                                        "name" : newPlaylist, //add the new playlist to the current state
                                        "songs" : []}]
    }),
    this.writePlaylists);
  }

  DeletePlaylist = d => {
    this.setState({playlists: this.state.playlists.filter(function(playlist) { 
      return playlist.id !== d.id;
    })},
    this.writePlaylists); //write the deletion to disk
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
      cookies: this.props.cookies,
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      selectedPlaylist: this.state.selectedPlaylist,
      SelectPlaylist: this.SelectPlaylist,
      songs: this.state.songs,
      handleDeletePlaylist: this.DeletePlaylist,
      handleSubmitPlaylist: this.handleSubmitPlaylist,
      playlists: this.state.playlists
    };

    return (
      <Routes childProps={childProps} />
    );
  }
}

export default withCookies(App);
