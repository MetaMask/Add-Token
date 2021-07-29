import React from 'react';
import switchNetwork from './switch-network.jpg';

const nameForNetwork = (network) => {
  let name = ''
  switch (network) {
    case '1': // main net
      name = 'The Main Ethereum Network'
      break
    case '2': // legacy ropsten test net
      name = 'The OLD Ropsten Test Network'
      break
    case '3': // ropsten test net
      name = 'The Ropsten Test Network'
      break
    case '4': // rinkeby test net
      name = 'The Rinkeby Test Network'
      break
    case '42': // kovan test net
      name = 'The Kovan Test Network'
      break
    default:
      name = `Network #${network}`
  }
  return name;
}

const SwitchNetworkNotice = (props) => {

  const { net, tokenNet } = props

  return (
    <div>
      <h1>Add Token</h1>
      <h2>Wrong Network Detected</h2>
      <p>You have {nameForNetwork(net)} selected, but this token requires {nameForNetwork(tokenNet)}. Please switch the current network in your web3 client.</p>
      <p>You can switch your current network in MetaMask like this:</p>
      <img src={switchNetwork} alt="Network can be switched in the MetaMask network menu in the top right hand corner." />
    </div>
  )
}



export default SwitchNetworkNotice;

