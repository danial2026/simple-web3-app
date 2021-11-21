import ethereumIcon from './Ethereum-ETH-icon.png';
import bitcoinIcon from './bitcoin-icon.png';
import './App.css';
import React, { Component } from 'react'
import MetaMaskOnboarding from '@metamask/onboarding'
var contractAbi = require('./contractAbi.json');

class App extends Component {

  constructor(props) {
    super(props);

    this.state  = {
      listAccounts: "address",
      curentNetwork:"network",
      etherBalance:"0",
      ourTokenBalance:"0",
      price_change_pctBTC:"0.0%",
      price_change_pctETH:"0.0%",
      priceBTC:"0",
      priceETH:"0"
    }

    this.connectMetamask()

    this.checkPriceChangePct()
  }

  updateInput = (event) =>{
    this.setState({walletAddress : event.target.value})
  }

  checkPriceChangePct = async() =>{
    let priceChangePct
    await require('axios')
      .get("https://api.nomics.com/v1/currencies/ticker?key=ce34cb12a2ef4e377b72261f1230eb7b1e7f01cb&ids=BTC,ETH&interval=1d,30d&convert=USD&per-page=100&page=1")
      .then(response => priceChangePct = response.data)

    console.log(priceChangePct)
    this.setState(      
      {
        price_change_pctBTC: priceChangePct[0]['1d']['price_change_pct'], /* BTC */
        price_change_pctETH: priceChangePct[1]['1d']['price_change_pct'], /* ETH */
        priceBTC: Number(parseFloat(priceChangePct[0]['price']).toFixed(2)), /* BTC */
        priceETH: Number(parseFloat(priceChangePct[1]['price']).toFixed(2)), /* ETH */
      }
    );
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
        
        // get ethereum balance
        const web3 = new Web3('https://rinkeby.infura.io/v3/d602f10d8b7a44419c0483e68321da77')
        
        web3.eth.getBalance(listItems[0], (err, bal) => {
          this.setState(
            {
              etherBalance: web3.utils.fromWei(bal, 'ether').toString(),
            }
          );
            console.log('account1 balance: ' ,web3.utils.fromWei(bal, 'ether'))
        })

        // get our token balance
        const contractAddres = '0x52e12aefc06b38627e27d51b5a87eafee759c57a'  
        var dappContract = new web3.eth.Contract(contractAbi, contractAddres)

        dappContract.methods.balanceOf(listItems[0]).call((err, bal) => {
          this.setState(
            {
              ourTokenBalance: bal.toString(),
            }
          );
          console.log('balance 1: ',bal)
        })

        this.setState(
          {
            listAccounts: listItems,
            curentNetwork: curentNetworkName,
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

  nextPath(path) {
    this.props.history.push(path);
  }

  render() {
    return (
      <div className="App">
        <header title={this.state}>
        </header>
        <body>

        <div>
          <div class="card card--front">
              <div class="card__number">{this.state.listAccounts}</div>
              <p class="card__title-balance"> balance : </p>              
              <div class='curency-name widget-heading'>
                <img class='ethereumIcon' src={ethereumIcon}/>
                <div class="card__balance">{this.state.etherBalance} ETH</div>
              </div>

              <div class='curency-name widget-heading'>
                <img class='ethereumIcon' src={bitcoinIcon}/>
                <div class="card__balance">{this.state.ourTokenBalance} BTC</div>
              </div>
              <div class="card__current-network">{this.state.curentNetwork}</div>
          </div>
        </div>
        
        <div id="wrapper">
          <ul>
          <li class="list-group-item">
              <div class="todo-indicator bg-focus"></div>
              <div class="widget-content p-0">
                  <div class="widget-content-wrapper">

                      <div class='curency-name widget-heading'>
                        <img class='ethereumIcon' src={ethereumIcon}/>
                        <div class='ethereumBalance'>Ethereum</div>
                      </div>
                      
                      <div class="widget-content-right"> 
                        <div class="">${this.state.priceETH}</div>
                        <div class={this.state.price_change_pctETH > 0  ? "price_change_green" : "price_change_red" }>{this.state.price_change_pctETH}</div>
                      </div>
                  </div>
              </div>
          </li>
            
          <li class="list-group-item">
              <div class="todo-indicator"></div>
              <div class="widget-content">
                  <div class="widget-content-wrapper">

                      <div class='curency-name widget-heading'>
                        <img class='ethereumIcon' src={bitcoinIcon}/>
                        <div class='ethereumBalance'>BTC</div>
                      </div>

                      <div class="widget-content-right"> 
                        <div >${this.state.priceBTC}</div>
                        <div class={this.state.price_change_pctBTC > 0  ? "price_change_green" : "price_change_red"}>{this.state.price_change_pctBTC}</div>
                      </div>
                  </div>
              </div>
          </li>
          </ul>
        </div>
        </body>
        {/* </div> */}
      </div>
    );
  }
}

export default App;
