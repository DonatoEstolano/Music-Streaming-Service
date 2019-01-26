import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from "./Components/Login/Login";

import Sidebar from './sidebar.js';

class App extends Component {
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

export default App;
