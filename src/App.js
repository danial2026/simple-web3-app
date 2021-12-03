import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { 
  BrowserRouter as Router,
  Routes,
  Route 
} from 'react-router-dom';
import Home from './pages/Home';
import Reports from './pages/Reports';
import Transactions from './pages/Transactions';
import CreateNFT from './pages/CreateNFT';
import MarketPlace from './pages/MarketPlace';
import Transfer from './pages/TransferPopup';

function App() {
  return (
    <>
    <Router className="App">
      <Navbar/>
      <Routes>
        <Route path='/simple-web3-app/' element={<Home />} />
        <Route path='/simple-web3-app/create-nft' element={<CreateNFT />} />
        <Route path='/simple-web3-app/transactions' element={<Transactions />} />
        <Route path='/simple-web3-app/market-place' element={<MarketPlace />} />
        <Route path='/simple-web3-app/reports' element={<Reports />} />
        <Route path='/simple-web3-app/transfer' element={<Transfer />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
