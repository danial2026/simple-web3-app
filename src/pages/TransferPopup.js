import React, { Component , useEffect, useRef, useState} from 'react'
import './TransferPopup.css';

var contractAbi = require('./../contractAbi.json');

class TransferPopup extends Component{

  constructor(props) {
    super(props);


    this.state  = {
      toAddress: "",
      amount: "",
      invalidInputs: "",
      transactionSent: false,
    }
  }

  setToAddress = async(inputArg) =>{

    this.setState(
      {
        toAddress: inputArg,
      }
    );
  }
  setAmount = async(inputArg) =>{

    this.setState(
      {
        amount: inputArg,
      }
    );
  }
  setInvalidInputs = async(inputArg) =>{

    this.setState(
      {
        invalidInputs: inputArg,
      }
    );
  }
  setTransactionSent = async(inputArg) =>{

    this.setState(
      {
        transactionSent: inputArg,
      }
    );
  }

  treansferToken = async() =>{
    const Web3 = require('web3')
    if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      window.ethereum.enable();
      var accounts = await window.web3.eth.getAccounts();

      const accountsList = accounts.map((account) => account);
      // call transfer method
      const contractAddres = '0x27422f52bf4cf152f2789b663229793f38cebf2e'  
      var dappContract = new window.web3.eth.Contract(contractAbi, contractAddres)

      this.setTransactionSent(true)

      dappContract.methods.transfer(this.state.toAddress, this.state.amount).send({from:accountsList[0]}).then((err, arg) => {
        console.log(' transfered ')
        this.props.closePopup()
      })
    }
  }

  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <div className="transter-popup">
            <ul>
              <li class="transter-token--input">
                  <div class="widget-content">
                      <div class="widget-content-wrapper">
                        <div class='transfer-title'>
                          Transfer
                        </div>
                      </div>
                  </div>
              </li>

              <li class="transter-token--input">
                  <div class="widget-content">
                      <div class="widget-content-wrapper">
                        <input 
                          placeholder="to address"
                          class='nftInput widget-content nft-input'
                          onChange={e => this.setToAddress(e.target.value)}
                        />
                      </div>
                  </div>
              </li>

              <li class="transter-token--input">
                  <div class="widget-content">
                      <div class="widget-content-wrapper">
                        <input 
                          placeholder="amount"
                          class='nftInput widget-content nft-input'
                          onChange={e => this.setAmount(e.target.value)}
                          />
                      </div>
                  </div>
              </li>

              <li class="transter-token--input">
                      <div class="widget-content-wrapper">
                      {
                        this.state.invalidInputs && (
                          <div class="invalid-input">
                              ✗ invalid inputs
                          </div>
                        )
                      }
                      {
                        this.state.transactionSent && (
                          <div class="transaction-sent">
                              ⌛	 waiting for network
                          </div>
                        )
                      }
                      </div>
              </li>

              <li class="transter-token--button">
                <div class="widget-content">
                  <div class="widget-content-wrapper">
                    <div class="widget-content-left"> 
                      <button onClick={this.treansferToken} className="transfer-token--transfer-button widget-content btn-ok">
                        Transfer
                      </button>
                    </div>

                    <div class="widget-content-right"> 
                      <button onClick={this.props.closePopup} className="transfer-token--cancel-button widget-content btn-cancel">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
    </div>
    );
  }
}

export default TransferPopup;