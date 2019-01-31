import React, { Component } from "react";
import "./Home.css";
import Sidebar from './sidebar.js';
import Player from './player.js';

export default class Home extends Component {
  render() {
    return (
      <div className="App">
      <header className="App-header">
          <p> Search bar goes here </p>
      </header>

  <section>
      <aside>
          <Sidebar SelectPlaylist={this.props.SelectPlaylist} selectedPlaylist={this.props.selectedPlaylist}></Sidebar>
      </aside>

      <article>
        <Player selectedPlaylist={ this.props.selectedPlaylist } songs={ this.props.songs }></Player>
      </article>
  </section>

    </div>
    );
  }
}