import './App.css';
import Landing from './components/Landing';
import Staking from './components/Staking';
import StakingNFT from './components/StakingNFT';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />}></Route>
        <Route path='/staking' element={<Staking />}></Route>
        <Route path='/stakingnft' element={<StakingNFT />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
