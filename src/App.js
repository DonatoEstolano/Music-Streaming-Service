import React, { Component } from 'react';
import './App.css';
import Routes from "./Routes";

class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      isAuthenticated: false,
      selectedPlaylist: 0
    };
  }
  
  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  SelectPlaylist = id => {
    this.setState({ selectedPlaylist: id});
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
