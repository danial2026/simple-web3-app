import { useState } from 'react'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import web3 from 'web3'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

var contractAbi = require('./../contract/contractAbi.json');

// import {
//   nftaddress, nftmarketaddress
// } from '../config'

// import NFT from '../contracts/NFT.sol/NFT.json'
// import Market from '../contracts/NFTMarket.sol/NFTMarket.json'

export default function CreateNFT() {
  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
//   const router = useRouter()

  async function createSale(url) {
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
  async function onChange(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      setFileUrl(url)
    } catch (error) {
      console.log('Error uploading file: ', error);
    }  
  }
  async function createMarket() {
    const { name, description, price } = formInput
    if (!name || !description || !price || !fileUrl) return
    // upload file to IPFS
    const data = JSON.stringify({
      name, description, image: fileUrl
    })
    try {
      const added = await client.add(data)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      createSale(url)
    } catch (error) {
      console.log('Error uploading file: ', error);
    }  
  }

  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        <input 
          placeholder="NFT Name"
          className="mt-8 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
        />
        <input
          placeholder="NFT Description"
          className="mt-2 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
        />
        <input
          placeholder="NFT Price in Eth"
          className="mt-2 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
        />
        <input
          type="file"
          name="NFT"
          className="my-4"
          onChange={onChange}
        />
        {
          fileUrl && (
            <img className="rounded mt-4" width="350" src={fileUrl} />,
            <h3>
                ✓ finish the upload
            </h3>
          )
        }
        <button onClick={createMarket} className="mt-4 bg-blue-500 text-white rounded p-4 shadow-lg">
          Create NFT
        </button>
      </div>
    </div>
  )
}