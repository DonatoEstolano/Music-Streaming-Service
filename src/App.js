import React, { Component } from 'react';
import './App.css';
import Routes from "./Routes";

class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      isAuthenticated: false,
      selectedPlaylist: {id: 0} //Mostly empty playlist object with ID of 0
    };
  }
  
  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  SelectPlaylist = playlist => {
    //Save entire object of the selected playlist into App state
    this.setState({ selectedPlaylist: playlist});
  }


  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      selectedPlaylist: this.state.selectedPlaylist,
      SelectPlaylist: this.SelectPlaylist
    };

    return (
      <Routes childProps={childProps} />
    );
  }
}

export default App;
