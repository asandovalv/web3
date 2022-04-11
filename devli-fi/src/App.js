//import logo from './logo.svg';
import { createContext, useState } from 'react';
import './App.css';
import Web3 from "web3/lib";
import AppRoutes from './routes';
import appConfig from '../src/config.json';
export const AppContext = createContext();


function App() {
  //Set initial state for Web3 services each time the page reloads
  const [web3, setWeb3] = useState(()=>{
    let _web3;
    if (typeof window.ethereum !== 'undefined') {
      _web3 = new Web3(window.ethereum);
      
    } else if (typeof Web3.givenprovider !== 'undefined') {
      _web3 = new Web3(Web3.givenprovider);
    }
    return _web3;   
  });

  const [isTestNet, setIsTestNet] = useState(()=>{
    return JSON.parse(appConfig.isTestNet);
  });

  const [currentAccount, setCurrentAccount] = useState(()=>{
    return localStorage.getItem('CurrentAccount');
  });

  return  (
      <>
        <AppContext.Provider value={[web3, isTestNet, currentAccount, setIsTestNet]}>
          <AppRoutes />
        </AppContext.Provider>
      </>
  );
}

export default App;
