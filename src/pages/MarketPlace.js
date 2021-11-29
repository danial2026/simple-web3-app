import React, { Component , useEffect, useRef, useState} from 'react'
import './MarketPlace.css';

var contractAbi = require('./../contract/nftAbi.json');
class MarketPlace extends Component{

  constructor(props) {
    super(props);

    this.state  = {
      listAccounts: "",
      itemCounter: "",
      itemURL: [],
      jsonNFTs: [],
    }

    this.marketPlaceStyle  = {
      'font-size': '16px',
      'padding': '30px 0 5px',
      'text-align': 'center',
    }

    this.getMarketPlaceInfo()
  }

  getItemInfo = async(url) =>{
    let jsonResponse
    await require('axios')
      .get(
        "https://cors-anywhere.herokuapp.com/" + url
      )
      .then(response => jsonResponse = response.data)

    console.log(jsonResponse.name)
    console.log(jsonResponse.description)
    console.log(jsonResponse.file)
    this.setState({
      jsonNFTs: [
          ...this.state.jsonNFTs,
          <li class="list-group-item">
          <div class="widget-content">
              <div class="widget-content-wrapper">

                  <div class='curency-name widget-heading'>
                    <div class='ethereumBalance'>{jsonResponse.name}</div>
                  </div>

                  <div class="widget-content-center"> 
                    <a href={url} target="_blank">
                      json on IPFS
                    </a>
                  </div>
                  
                  <div class="widget-content-right"> 
                    <img class='ethereumIcon' src={jsonResponse.file}/>
                  </div>
              </div>
          </div>
      </li>
      ],
    })

    console.log(this.state.jsonNFTs)
  }

  getMarketPlaceInfo = async() =>{
      const Web3 = require('web3')
      if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
        window.ethereum.enable();
        var accounts = await window.web3.eth.getAccounts();
        const accountsList = accounts.map((account) => account);

        // get our token balance
        const contractAddres = '0x366f557424e37d3cbc4e1c4be9c67c1fd14e77ef'  
        var dappContract = new window.web3.eth.Contract(contractAbi, contractAddres)

        dappContract.methods.getItemCounter().call((err, counter) => {
          this.setState(
            {
              itemCounter: counter.toString(),
            }
          );

          for (let i = 1; i <= this.state.itemCounter; i++) {
            this.getItemURL(i)
          }  
        })
      }    
  }

  getItemURL = async(itemId) =>{
    const Web3 = require('web3')
    if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      window.ethereum.enable();
      var accounts = await window.web3.eth.getAccounts();
      const accountsList = accounts.map((account) => account);

      // get our token balance
      const contractAddres = '0x366f557424e37d3cbc4e1c4be9c67c1fd14e77ef'  
      var dappContract = new window.web3.eth.Contract(contractAbi, contractAddres)

      console.log('itemId ',itemId)

      dappContract.methods.tokenURI(itemId).call((err, url) => {
        this.setState({
          itemURL: [
              ...this.state.itemURL,
              url,
          ],
        })

        console.log('url ',url)
        this.getItemInfo(url)
      })
    }    
  }

  render() {
    return (
      <div className='market-place'>
        <div id="market-place">
          <div>
            <div style={this.marketPlaceStyle}>
              market place
            </div>
          </div>

          <ul>
          {
            this.state.jsonNFTs && (
              <div class="">
                {this.state.jsonNFTs}
              </div>
            )
          }
          </ul>
        </div>
      </div>
    )
  };
}

export default MarketPlace;
