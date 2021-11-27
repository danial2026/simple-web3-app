import React, { Component , useEffect, useRef, useState} from 'react'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import web3 from 'web3'
import './CreateNFT.css';
import ipfsIcon from './../assets/Ipfs-icon.png';
import nftIcon from './../assets/nft-icon.png';

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

var contractAbi = require('./../contract/contractAbi.json');

// import {
//   nftaddress, nftmarketaddress
// } from '../config'

// import NFT from '../contracts/NFT.sol/NFT.json'
// import Market from '../contracts/NFTMarket.sol/NFTMarket.json'

class CreateNFT extends Component{
  
  constructor(props) {
    super(props);


    this.state  = {
      fileUrl: "",
      validInputs:"",
      formInput:""
    }
  }

  // async setStates() {
  //   const [fileUrl, setFileUrl] = useState(null)
  //   const [validInputs, setValidInputs] = useState(null)
  //   const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
  // //   const router = useRouter()
  
  // }
  setFileUrl = async(inputArg) =>{

    this.setState(
      {
        fileUrl: inputArg,
      }
    );
  }
  
  setValidInputs = async(inputArg) =>{

    this.setState(
      {
        validInputs: inputArg,
      }
    );
  }
  
  updateFormInput = async(inputArg) =>{

    this.setState(
      {
        formInput: inputArg,
      }
    );
  }
  
  createSale = async(url) =>{
      console.log(url);
    // const web3Modal = new Web3Modal({
    //   network: "mainnet",
    //   cacheProvider: true,
    // });
    // const connection = await web3Modal.connect()
    // const provider = new ethers.providers.Web3Provider(connection)    
    // const signer = provider.getSigner()
    
    // let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
    // let transaction = await contract.createToken(url)
    // let tx = await transaction.wait()
    // let event = tx.events[0]
    // let value = event.args[2]
    // let tokenId = value.toNumber()
    // const price = web3.utils.toWei(formInput.price, 'ether')
  
    // const listingPrice = web3.utils.toWei('0.1', 'ether')

    // contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    // transaction = await contract.createMarketItem(nftaddress, tokenId, price, { value: listingPrice })
    
    // await transaction.wait()
    // router.push('/')


    const Web3 = require('web3')
    if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      window.ethereum.enable();
      var accounts = await window.web3.eth.getAccounts();

      const curentNetworkName = await window.web3.eth.net.getNetworkType();

      const listItems = accounts.map((account) => account);

      // get our token balance
      const contractAddres = '0x27422f52bf4cf152f2789b663229793f38cebf2e'  
      var dappContract = new web3.eth.Contract(contractAbi, contractAddres)

      dappContract.methods.balanceOf(listItems[0]).call((err, bal) => {
        this.setState(
          {
            ourTokenBalance: bal.toString(),
          }
        );
        console.log(' NFT minted ')
      })
    }
  }

  onChange = async(e) =>{
    this.setValidInputs(false) 
    const file = e.target.files[0];
    console.log(typeof (file))
    try {
      const added = await client.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      this.setFileUrl(url)
    } catch (error) {
      console.log('Error uploading file: ', error);
    }  
  }

  createNFTJsonFile = async() =>{
    const { name, description, price } = this.state.formInput
    if (!name || !description || !price || !this.state.fileUrl) {
      this.setValidInputs(true) 
      this.setFileUrl(false)
      return
    }
    // upload file to IPFS
    const data = JSON.stringify({
      name, description, file: this.state.fileUrl
    })
    try {
      const added = await client.add(data)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      // this.createSale(url)
    } catch (error) {
      console.log('Error uploading file: ', error);
    }  
  }

  cancelCreation = async() =>{ 
  }

  render() {
  return (
  <div className="App">
    <div id="wrapper">
      <ul>
        <li class="create-nft--icon">
            <div class="widget-content">
                <div class="widget-content-wrapper">
                  {/* <div class="card card--front"> */}
                    <img class='nft-icon' src={nftIcon}/>
                  {/* </div> */}
                </div>
            </div>
        </li>

        <li class="create-nft--input">
            <div class="widget-content">
                <div class="widget-content-wrapper">
                  <input 
                    placeholder="NFT Name"
                    class='nftInput widget-content nft-input'
                    onChange={e => this.updateFormInput({ ...this.state.formInput, name: e.target.value })}
                  />
                </div>
            </div>
        </li>

        <li class="create-nft--input">
            <div class="widget-content">
                <div class="widget-content-wrapper">
                  <input 
                    placeholder="NFT Description"
                    class='nftInput widget-content nft-input'
                    onChange={e => this.updateFormInput({ ...this.state.formInput, description: e.target.value })}
                    />
                </div>
            </div>
        </li>

        <li class="create-nft--input">
            <div class="widget-content">
                <div class="widget-content-wrapper">
                  <input 
                    placeholder="NFT Price"
                    class='nftInput widget-content nft-input'
                    onChange={e => this.updateFormInput({ ...this.state.formInput, price: e.target.value })}
                  />
                </div>
            </div>
        </li>

        <li class="create-nft--input">
          <input
            type="file"
            name="NFT"
            class='nftInput widget-content'
            onChange={this.onChange}
          />{
            this.state.fileUrl && (
              <img className="rounded mt-4" width="350" src={this.state.fileUrl} />,
              <div>
                  ✓ finish the upload
              </div>
            )
          }
          {
            this.state.validInputs && (
              <div>
                  ✗ invalid inputs
              </div>
            )
          }
        </li>

        <li class="create-nft--button">
          <div class="widget-content">
            <div class="widget-content-wrapper">
              <div class="widget-content-left"> 
                <button onClick={this.createNFTJsonFile} className="create-nft--create-button widget-content btn-create">
                  Create NFT
                </button>
              </div>

              <div class="widget-content-right"> 
                <button onClick={this.cancelCreation} className="create-nft--cancel-button widget-content btn-cancel">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
  )
  }
}

export default CreateNFT;