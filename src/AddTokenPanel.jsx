import React, { Component } from 'react';
import detectEthereumProvider from '@metamask/detect-provider'
import SwitchNetworkNotice from './SwitchNetworkNotice'
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import DownloadMetaMaskButton from './DownloadMetaMaskButton';
import Eth from 'ethjs-query';
import { Link } from 'react-router-dom'
import logo from './coin.jpg';
import queryString from 'querystringify'

const metaMarkAddress = '0x4Fc0Dc6f38D9FCf01F25627Abb809aa1BE934d6F';

class AddTokenPanel extends Component {

  constructor(props) {
    const {
      tokenName = 'RainbowSix',
      tokenSymbol = 'RSIX',
      tokenDecimals = 18,
      tokenAddress = metaMarkAddress,
      tokenImage = 'https://github.com/TokenRSIX/RainbowSix/blob/main/rsix%20200x200.png?raw=true',
      tokenNet = '56',
      message = '',
      errorMessage = '',
      net = '56',
    } = props

    super()
    this.state = {
      tokenName,
      tokenSymbol,
      tokenDecimals,
      tokenAddress,
      tokenImage,
      tokenNet,
      message,
      errorMessage,
      net,
    }

    const search = window.location.search
    const params = queryString.parse(search)

    for (let key in params) {
      this.state[key] = params[key]
    }

    this.updateNet()
  }

  componentDidMount() {
    const search = this.props.location.search
    const params = queryString.parse(search)
    this.setState(params)
  }

  async updateNet() {
    const provider = await detectEthereumProvider()
    const eth = new Eth(provider)
    const realNet = await eth.net_version()
    this.setState({ net: realNet })
  }

  render(props, context) {
    const {
      tokenName,
      tokenSymbol,
      tokenDecimals,
      tokenNet,
      net,
      tokenImage,
      tokenAddress,
      message,
      errorMessage,
    } = this.state

    let error
    if (errorMessage !== '') {
      error = <p className="errorMessage">
        There was a problem adding this token to your wallet. Make sure you have the latest version of MetaMask installed!
        <DownloadMetaMaskButton />
      </p>
    }

    if (tokenNet !== net) {
      return <SwitchNetworkNotice net={net} tokenNet={tokenNet} />
    }

    return (
      <div className="values">
        <header className="App-header">
          <img src={tokenImage || logo} className="logo" alt="Coin" />
          <h1 className="App-title">Watch {tokenName}</h1>
        </header>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Symbol</TableCell>
            <TableCell>{tokenSymbol}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Decimals</TableCell>
              <TableCell>{tokenDecimals}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div>
          <Button
           
          > <a  href="https://bscscan.com/token/0x4Fc0Dc6f38D9FCf01F25627Abb809aa1BE934d6F">View on BscScan</a> </Button>

          <Button
            onClick={async (event) => {
              const provider = await detectEthereumProvider()
              provider.sendAsync({
                method: 'wallet_watchAsset',
                params: {
                  "type": "ERC20",
                  "options": {
                    "address": tokenAddress,
                    "symbol": tokenSymbol,
                    "decimals": tokenDecimals,
                    "image": tokenImage,
                  },
                },
                id: Math.round(Math.random() * 100000),
              }, (err, added) => {
                console.log('provider returned', err, added)
                if (err || 'error' in added) {
                  this.setState({
                    errorMessage: 'There was a problem adding the token.',
                    message: '',
                  })
                  return
                }
                this.setState({
                  message: 'RSIX added!',
                  errorMessage: '',
                })
              })
            }}
          >Add RSIX </Button>

        </div>

        <p>{message}</p>
        {error}

        <div className="spacer"></div>

        <Typography gutterBottom noWrap>
          {`
            
          `}
        </Typography>
        <Link to="/edit">
          <Button>
          
          </Button>
        </Link>

      </div>
    )
  }
}

export default AddTokenPanel;

