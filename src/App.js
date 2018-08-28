import React, { Component } from 'react';
import logo from './coin.jpg';
import './App.css';
import { Web3Provider } from 'react-web3';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="logo"/>
          <h1 className="App-title">Add Token</h1>
        </header>
        <Web3Provider>
          <p className="App-intro">
            You have MetaMask installed!
            <button
              onClick = {(event) => {
                console.log('Event', event)
              }}
            >
              Add Token
            </button>
          </p>
        </Web3Provider>
      </div>
    );
  }
}

export default App;
