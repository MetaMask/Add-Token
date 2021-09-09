import detectEthereumProvider from '@metamask/detect-provider';
import React, { useState } from 'react';
import { BrowserRouter, HashRouter, Route, Switch } from 'react-router-dom';
import AddTokenPanel from './AddTokenPanel';
import './App.css';
import DownloadMetaMaskButton from './DownloadMetaMaskButton';
import EditTokenPanel from './EditTokenPanel';
import loadingSvg from './loading.svg';


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
      <div>
        <h2>You need a web3 browser like MetaMask to use this site and manage cryptocurrencies.</h2>
        <DownloadMetaMaskButton />
      </div>
    </div>
  )
}

const App = () => {
  const [isProviderLoaded, setProvider] = useState([]);
  const [isLoading, setLoading] = useState([true]);

  const checkEthereumProvider = async () => {
    const provider = await detectEthereumProvider()
    setLoading(false)
    setProvider(provider)
  }

  checkEthereumProvider()

  return (
    <div className="App">
      {isLoading ? <div><div><img className="loading-spinner" src={loadingSvg} /><h2>Loading.....</h2></div></div>
        : <div>
          <a className="github-banner" href="https://github.com/MetaMask/Add-Token"><img src="https://s3.amazonaws.com/github/ribbons/forkme_right_gray_6d6d6d.png" alt="Fork me on GitHub" /></a>

          {isProviderLoaded ? <MainContent /> : <ErrorContent />}

        </div>}
    </div>
  );
}



export default App;
