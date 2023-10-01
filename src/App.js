import detectEthereumProvider from '@metamask/detect-provider';
import React, { useState } from 'react';
import { BrowserRouter, HashRouter, Route, Switch } from 'react-router-dom';
import AddTokenPanel from './AddTokenPanel';
import './App.css';
import DownloadMetaMaskButton from './DownloadMetaMaskButton';




const MainContent = () => {
  return (
    <div>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <HashRouter hashType="noslash">
          <Switch>
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
      
         <div>
          <a  href="https://www.rainbowsix.biz/">"WebsiteRSIX" </a><p>0x4Fc0Dc6f38D9FCf01F25627Abb809aa1BE934d6F</p>
          

          {isProviderLoaded ? <MainContent /> : <ErrorContent />}

        </div>
    </div>
  );
}



export default App;
