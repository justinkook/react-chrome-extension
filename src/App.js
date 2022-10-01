/*global chrome*/

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {this.props.isExt ? 
            <img src={chrome.runtime.getURL("static/media/logo.svg")} className="App-logo" alt="logo" />
          :
            <img src={logo} className="App-logo" alt="logo" />
          }

          <h1 className="App-title">Average Price</h1>
        </header>
        <p id="status" className="App-intro"></p>
      </div>
    );
  }
}

export default App;
