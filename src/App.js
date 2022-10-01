/*global chrome*/

import React, { Component, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { getCurrentTabUrl, getImageUrl } from './content';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: localStorage.getItem('searchTerm'),
      averagePrice: localStorage.getItem('averagePrice')
    }
  }

  componentDidUpdate = () => {
    window.addEventListener('storage', () => {
       this.setState({ averagePrice: localStorage.getItem('averagePrice'), searchTerm: localStorage.getItem('searchTerm')})
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

          <h1 className="App-title">{this.state.searchTerm}</h1>
        </header>
        <p id="status" className="App-intro">Average Price : {this.state.averagePrice}</p>
      </div>
    );
  }
}

export default App;
