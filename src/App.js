import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'
import MetaMaskOnboarding from '@metamask/onboarding'

class App extends Component {

  constructor(props) {
    super(props);

    const getAccountsButton = document.getElementById('getAccounts')
    const getAccountsResults = document.getElementById('getAccountsResult')
    const onboarding = new MetaMaskOnboarding();


    this.state  = {
      balance: "",
      walletAddress: "",
      listAccounts: "",
      curentNetwork:"",
      etherBalance:"",
      ourTokenBalance:""
    }
  }

  updateInput = (event) =>{
    this.setState({walletAddress : event.target.value})
  }

  getBalance = () =>{
    const Web3 = require('web3')
    const web3 = new Web3('https://rinkeby.infura.io/v3/d602f10d8b7a44419c0483e68321da77')
    
    web3.eth.getBalance(this.state.walletAddress, (err, bal) => {
      this.setState({balance: web3.utils.fromWei(bal, 'ether').toString()});
        console.log('account1 balance: ' ,web3.utils.fromWei(bal, 'ether'))
    })
  }

  connectMetamask = async() =>{
    const ethEnabled = async() => {
      const Web3 = require('web3')
      if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
        window.ethereum.enable();
        var accounts = await window.web3.eth.getAccounts();
        console.log(accounts)

        const curentNetworkName = await window.web3.eth.net.getNetworkType();

        const listItems = accounts.map((account) => account);

        this.setState(
          {
            listAccounts: listItems,
            curentNetwork: curentNetworkName
          }
        );

        return true;
      }
      return false;
    }

    if (!ethEnabled()) {
      alert("Please install MetaMask to use this dApp!");
    }
  }

  render() {
    return (
      <div className="App">
        <header title={this.state}>
          <img src={logo} className="App-logo" alt="logo" />
          <input class="center-block" type="text" onChange={this.updateInput}></input>
          <p> balance : {this.state.balance} </p>
          <button onClick={this.getBalance}>get balance</button>
          <button onClick={this.connectMetamask}>connect</button>
        </header>

        <div>
          <link rel="stylesheet" type="text/css" href="./wallet-template.css"/>
          <div class="card card--front">
              <div class="card__number">{this.state.listAccounts}</div>
              <div class="card__balance">{this.state.etherBalance}</div>
              <div class="card__balance">{this.state.ourTokenBalance}</div>
              <div class="card__current-network">{this.state.curentNetwork}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
