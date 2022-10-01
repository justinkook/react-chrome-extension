/*global chrome*/

import React, { Component, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { getCurrentTabUrl, getImageUrl } from './content';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      averagePrice: localStorage.getItem('averagePrice')
    }
  }

  componentDidUpdate = () => {
    window.addEventListener('storage', () => {
       this.setState(JSON.parse(localStorage.getItem('myCart')) || [])   
    });
  }

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
        <p id="status" className="App-intro">{this.state.averagePrice}</p>
      </div>
    );
  }
}

export default App;
