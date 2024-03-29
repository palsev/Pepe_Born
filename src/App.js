import './App.css';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { WalletProvider } from './context/WalletContext';
import Landing from './pages/Landing';
import Staking from './pages/Staking';
import MintingNFT from './pages/MintingNFT';
import StakingNFT from './pages/StakingNFT';

const App = () => {
    return (
        <WalletProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Landing />}></Route>
                    <Route path='/staking' element={<Staking />}></Route>
                    <Route path='/nftmint' element={<MintingNFT />}></Route>
                    <Route path='/nftstake' element={<StakingNFT />}></Route>
                </Routes>
            </BrowserRouter>
        </WalletProvider>
    );
}

export default App;