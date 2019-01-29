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
          <Sidebar></Sidebar>
      </aside>

      <article>
        <Player></Player>
      </article>
  </section>

    </div>
    );
  }
}