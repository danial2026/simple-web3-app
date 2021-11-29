import React, { Component , useEffect, useRef, useState} from 'react'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import './CreateNFT.css';
import ipfsIcon from './../assets/Ipfs-icon.png';
import nftIcon from './../assets/nft-icon.png';
import Progressbar from './Progress_bar';

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

var contractAbi = require('./../contract/nftAbi.json');

class CreateNFT extends Component{
  
  constructor(props) {
    super(props);


    this.state  = {
      fileUrl: "",
      filePercentage: "",
      jsonUrl:"",
      validInputs:"",
      formInput:"",
      tokenIsminted:""
    }
  }

  setFileUrl = async(inputArg) =>{

    this.setState(
      {
        fileUrl: inputArg,
      }
    );
  }
  setFilePercentage = async(inputArg) =>{

    this.setState(
      {
        filePercentage: inputArg,
      }
    );
  }
  
  setJsonUrl = async(inputArg) =>{

    this.setState(
      {
        jsonUrl: inputArg,
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
  
  setTokenIsminted = async(inputArg) =>{

    this.setState(
      {
        tokenIsminted: inputArg,
      }
    )
  }
  
  createSale = async(url) =>{
    console.log(url);

    const Web3 = require('web3')
    if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      window.ethereum.enable();
      var accounts = await window.web3.eth.getAccounts();

      const accountsList = accounts.map((account) => account);
      // call mintNFT method
      const contractAddres = '0x366f557424e37d3cbc4e1c4be9c67c1fd14e77ef'  
      var dappContract = new window.web3.eth.Contract(contractAbi, contractAddres)

      console.log(accountsList[0])

      dappContract.methods.mintNFT(accountsList[0], url).send({from:accountsList[0]}).then((err, arg) => {
        this.setTokenIsminted(true)
        console.log(' NFT minted ')
      })
    }
  }

  onChange = async(e) =>{
    this.setValidInputs(false) 
    const file = e.target.files[0];
    try {
      const added = await client.add(
        file,
        {
          progress: (prog) =>{
            this.setFilePercentage(Math.round((prog/file.size)*100))
            console.log(`received: ${prog}`)
            console.log(`all: ${file.size}`)
          } 
        }
      )
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      this.setFileUrl(url)
    } catch (error) {
      console.log('Error uploading file: ', error);
    }  
  }

  createNFTJsonFile = async() =>{
    const { name, description } = this.state.formInput
    if (!name || !description || !this.state.fileUrl) {
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
      this.setJsonUrl(url)
      await this.createSale(url)
    } catch (error) {
      console.log('Error uploading file: ', error);
    }  
  }

  cancelCreation = async() =>{ 
  }

  render() {
  return (
  <div className="App create-nft">
    <div id="wrapper">
      <ul>
        <li class="create-nft--icon">
            <div class="widget-content">
                <div class="widget-content-wrapper">
                    <img class='nft-icon' src={nftIcon}/>
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
          <input
            type="file"
            name="NFT"
            class='nftInput widget-content'
            onChange={this.onChange}
          />
          {
            this.state.filePercentage && (
              <div class="finish-upload-percentage">
                  <Progressbar bgcolor="#99ccff" progress={this.state.filePercentage}  height={30} />
               </div>
            )
          }
          {
            this.state.fileUrl && (
              <div class="finish-upload">
                  ✓ finish the upload
              </div>,
              <div class="finish-upload-url">
                <a href={this.state.fileUrl} target="_blank">
                  ✓ file is on IPFS
                </a>
              </div>
            )
          }
          {
            this.state.jsonUrl && (
              <div class="">
                <a href={this.state.jsonUrl} target="_blank">
                  ✓ json is on IPFS
                </a>
              </div>
            )
          }
          {
            this.state.validInputs && (
              <div class="invalid-input">
                  ✗ invalid inputs
              </div>
            )
          }
          {
            this.state.tokenIsminted && (
              <div class="">
                ✓ NFT is minted 
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