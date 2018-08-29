import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Eth from 'ethjs-query';
import etherscanLink from 'etherscan-link';
import logo from './coin.jpg';

const metaMarkAddress = '0x617b3f8050a0bd94b6b1da02b4384ee5b4df13f4';

class AddTokenPanel extends Component {

  constructor (props) {
    const {
      tokenName = 'MetaMarks',
        tokenSymbol = 'MARK',
        tokenDecimals = 18,
        tokenAddress = metaMarkAddress,
        tokenImage = 'https://pbs.twimg.com/profile_images/802481220340908032/M_vde_oi_400x400.jpg',
        tokenNet = '1',
        message = '',
        net = '1',
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
      net,
    }

    this.updateNet()
  }

  async updateNet () {
    const provider = window.web3.currentProvider
    const eth = new Eth(provider)
    const realNet = await eth.net_version()
    this.setState({ net: realNet })
  }


  render (props, context) {
    const {
      tokenName,
      tokenSymbol,
      tokenDecimals,
      tokenNet,
      net,
      tokenImage,
      tokenAddress,
      message,
    } = this.state

    if (tokenNet !== net) {
      return (
        <div>
          You have network {net} selected, but this token requires {tokenNet}. Please switch the current network in your web3 client.
        </div>
      )
    }

    return (
      <div className="values">
        <header className="App-header">
          <img src={tokenImage || logo} className="logo" alt="Coin"/>
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
              <TableCell>{18}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Button
          onClick={() => {
            const { tokenAddress, net } = this.state
            window.location.href = etherscanLink.createAccountLink(tokenAddress, net)
          }}
        >View on Etherscan</Button>

        <Button
          onClick = {async (event) => {
            const provider = window.web3.currentProvider
            provider.sendAsync({
              method: 'metamask_watchAsset',
              params: {
                "type":"ERC20",
                "options":{
                  "address": tokenAddress,
                  "symbol": tokenSymbol,
                  "decimals": tokenDecimals,
                  "image": tokenImage,
                },
              },
              id: Math.round(Math.random() * 100000),
            }, (err, added) => {
              if (err) {
                this.setState({
                  message: 'There was a problem adding the token.'
                })
                return
              }
              this.setState({
                message: 'Token added!'
              })
            })
          }}
        >Watch in Wallet</Button>
        <p>{message}</p>
      </div>
    )
  }
}

AddTokenPanel.contextTypes = {
  web3: PropTypes.object,
}

export default AddTokenPanel;

