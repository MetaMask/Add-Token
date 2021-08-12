import React, { useState, useEffect } from 'react';
import detectEthereumProvider from '@metamask/detect-provider'
import './App.css';
import AddTokenPanel from './AddTokenPanel';
import EditTokenPanel from './EditTokenPanel';
import DownloadMetaMaskButton from './DownloadMetaMaskButton';
import { BrowserRouter, Route, Switch, HashRouter } from 'react-router-dom';


const MainContent = () => {
  return (
    <div>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <HashRouter hashType="noslash">
          <Switch>
            <Route path="/edit" component={EditTokenPanel} />
            <Route path="/add" component={AddTokenPanel} />
            <Route path="/" component={AddTokenPanel} />
          </Switch>
        </HashRouter>
      </BrowserRouter>
    </div>
  )
};

const ErrorContent = () => {
  return (
    <div>
      <p>You need a web3 browser like MetaMask to use this site and manage cryptocurrencies.</p>
      <DownloadMetaMaskButton />
    </div>
  )
}

const App = () => {
  const [isProviderLoaded, setProvider] = useState([]);

  const checkEthereumProvider = async () => {
    const provider = await detectEthereumProvider()
    setProvider(provider)
  }

  useEffect(() => {
    checkEthereumProvider()
  }, [isProviderLoaded])

  return (
    <div className="App">
      <a className="github-banner" href="https://github.com/MetaMask/Add-Token"><img src="https://s3.amazonaws.com/github/ribbons/forkme_right_gray_6d6d6d.png" alt="Fork me on GitHub" /></a>

      {isProviderLoaded ? <MainContent /> : <ErrorContent />}

    </div>
  );
}



export default App;
