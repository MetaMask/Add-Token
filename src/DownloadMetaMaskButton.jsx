import React from 'react';
import downloadButton from './download-metamask.png';

const DownloadMetaMaskButton = () => {
  return (
    <a href="https://metamask.io">
      <img className="downloadButton" src={downloadButton} alt="Download MetaMask" />
    </a>
  )
}

export default DownloadMetaMaskButton

