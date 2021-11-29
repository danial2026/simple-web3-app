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
        <Route path='/' element={<Home />} />
        <Route path='/create-nft' element={<CreateNFT />} />
        <Route path='/transactions' element={<Transactions />} />
        <Route path='/market-place' element={<MarketPlace />} />
        <Route path='/reports' element={<Reports />} />
        <Route path='/transfer' element={<Transfer />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
