import ethereumIcon from './Ethereum-ETH-icon.png';
import './App.css';
import React, { Component } from 'react'
import MetaMaskOnboarding from '@metamask/onboarding'
class App extends Component {

  constructor(props) {
    super(props);

    this.state  = {
      listAccounts: "address",
      curentNetwork:"network",
      etherBalance:"0",
      ourTokenBalance:"0"
    }

    this.connectMetamask()
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
        
        // get balance
        // const Web3 = require('web3')
        const web3 = new Web3('https://rinkeby.infura.io/v3/d602f10d8b7a44419c0483e68321da77')
        
        web3.eth.getBalance(listItems[0], (err, bal) => {
          this.setState(
            {
              etherBalance: web3.utils.fromWei(bal, 'ether').toString(),
              ourTokenBalance: web3.utils.fromWei(bal, 'ether').toString(),
            }
          );
            console.log('account1 balance: ' ,web3.utils.fromWei(bal, 'ether'))
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
                <div class="card__balance">{this.state.etherBalance} wei</div>
              </div>

              <div class='curency-name widget-heading'>
                <img class='ethereumIcon' src={ethereumIcon}/>
                <div class="card__balance">{this.state.ourTokenBalance} tbt</div>
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
                        <div class="">$89</div>
                        <div class=""> + 0.11%</div>
                      </div>
                  </div>
              </div>
          </li>
            
          <li class="list-group-item">
              <div class="todo-indicator"></div>
              <div class="widget-content">
                  <div class="widget-content-wrapper">

                      <div class='curency-name widget-heading'>
                        <img class='ethereumIcon' src={ethereumIcon}/>
                        <div class='ethereumBalance'>Ethereum</div>
                      </div>

                      <div class="widget-content-right"> 
                        <div class="">$1.8</div>
                        <div class=""> - 2.3%</div>
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
