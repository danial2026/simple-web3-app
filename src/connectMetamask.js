import React, { Component } from 'react'
import metamaskIcon from './metamask.svg';
import ReactDOM from 'react-dom';
import App from './App';

export default class ConnectMetamask extends Component {

  constructor(props) {
    super(props);
  }

  ethEnabled = async() => {
    const Web3 = require('web3');
    if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      window.ethereum.enable();
      var accounts = await window.web3.eth.getAccounts();
      
      const curentNetworkName = await window.web3.eth.net.getNetworkType();
      
      return accounts.length > 0;
    }
    return false;
  }

  connectBtnPressed  = async () => {
    var isConnected = false;
    isConnected = await this.ethEnabled();

    console.log(isConnected);

    if(isConnected == true){
      ReactDOM.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>,
        document.getElementById('root')
      );
    }
  }

  render() {
    return (
      <div className="connectMetamask">
        
        <img class='metamaskIcon' src={metamaskIcon} onClick={this.connectBtnPressed} title="click to connect"/>
        
        <dev class='metamaskText'>
          click to connect
        </dev>
      </div>
    );  
  } 
}