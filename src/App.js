import React, { Component } from 'react';
import './App.css';
import { Web3Provider } from 'react-web3';
import AddTokenPanel from './AddTokenPanel';
import EditTokenPanel from './EditTokenPanel';
import { Route } from 'react-router-dom'

class App extends Component {

  render(props, context) {
    return (
      <div className="App">
        <a className="github-banner" href="https://github.com/MetaMask/Add-Token"><img src="https://s3.amazonaws.com/github/ribbons/forkme_right_gray_6d6d6d.png" alt="Fork me on GitHub" /></a>
        <Web3Provider>
          <Route path="/edit" component={EditTokenPanel} />
          <Route path="/" component={AddTokenPanel} />
        </Web3Provider>
      </div>
    );
  }
}

export default App;
