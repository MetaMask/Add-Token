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
        <Web3Provider>
          <Route path="/edit" component={EditTokenPanel} />
          <Route path="/add" component={AddTokenPanel} />
        </Web3Provider>
      </div>
    );
  }
}

export default App;
