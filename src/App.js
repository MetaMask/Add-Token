import React, { Component } from 'react';
import './App.css';
import { Web3Provider } from 'react-web3';
import AddTokenPanel from './AddTokenPanel';

class App extends Component {

  render(props, context) {
    return (
      <div className="App">
        <Web3Provider>
          <AddTokenPanel/>
        </Web3Provider>
      </div>
    );
  }
}

export default App;
