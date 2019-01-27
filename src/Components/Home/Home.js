import React, { Component } from "react";
import "./Home.css";
import Sidebar from './sidebar.js';

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
          <p> Music goes here </p>
      </article>
  </section>

    </div>
    );
  }
}