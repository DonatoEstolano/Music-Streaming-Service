import React, { Component } from "react";
import "./Home.css";
import FadeIn from 'react-fade-in';
import SearchField from 'react-search-field';
import ToggleDisplay from 'react-toggle-display';
import Sidebar from './sidebar.js';
import Player from './player.js';
import AudioSpectrum from 'react-audio-spectrum';

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

  data = [
    {
      key: 'john',
      value: 'John Doe',
    },
    {
      key: 'jane',
      value: 'Jane Doe',
    },
    {
      key: 'mary',
      value: 'Mary Phillips',
    },
    {
      key: 'robert',
      value: 'Robert',
    },
    {
      key: 'karius',
      value: 'Karius',
    },
  ]

  render() {
    return (
      <section className="landing">
        <div className="landing-inner-top">
          <nav className="landing-inner-top-nav">
            <div onClick={ () => this.handleClick() } className="landing-inner-top-nav-container">
              <div className="container-bar"></div>
              <div className="container-bar"></div>
              <div className="container-bar"></div>
            </div>
          </nav>
          <ToggleDisplay tag="div" show={this.state.show} className="playlist-container">
            <Sidebar>

            </Sidebar>
          </ToggleDisplay>
          <div className="landing-inner-top-content">
            <FadeIn delay="500" transitionDuration="2500">
              <SearchField classNames="landing-inner-top-searchbar" placeholder="Search artist or song"></SearchField>
              <audio id="audio-element" src="./Give You Up.mp3"></audio>
              <AudioSpectrum audioId="audio-element"></AudioSpectrum>
            </FadeIn>
          </div>
        </div>
      </section>
    );
  }
}