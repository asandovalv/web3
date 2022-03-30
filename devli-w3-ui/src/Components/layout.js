import { useEffect, useState , useMemo} from "react";
import { Outlet, NavLink } from "react-router-dom";
import { validateCurrentAccount, connectAccount, disconnectAccount, getCurrentAccount} from "../Services/Security/accounts";
import { BsBox } from 'react-icons/bs'
import { FaHome } from 'react-icons/fa'
import Web3 from "web3/lib";
import appconfig from '../config.json'
import './layout.css'
import useWeb3ConnectorStorage from "../Resourses/Locals/useWeb3ConnectorStorage";




function Layout() {
  var is_testnet = JSON.parse(localStorage.getItem('IsTestNet'));
  
  const [walletAction, setWalletAction] = useState(""); 

  const [web3, setWeb3] = useState(()=>{
   
   let _web3;
    if (typeof window.ethereum !== 'undefined') {
      _web3 = new Web3(window.ethereum);
      
    } else if (typeof Web3.givenprovider !== 'undefined') {
      _web3 = new Web3(Web3.givenprovider);
    }
    return _web3;   
  });

  let shouldEnable = validateCurrentAccount('CurrentAccount');

  useEffect(()=>{
    if(typeof(window.ethereum) == 'undefined'){
      setWalletAction("Install Wallet");
    }else{
      if(validateCurrentAccount('CurrentAccount')){
        setWalletAction("Disconnect Wallet");
      }else{
        setWalletAction("Connect Wallet")
      }
      
    }

  },[walletAction])
    


  async function addNetwork() {
   

    if (typeof web3 !== 'undefined') {
        
        var network = 0;
        var netID;
        network = await web3.eth.net.getId();
        netID = network.toString();
        var params;
        if (typeof(is_testnet) !== 'undefined' && !is_testnet) {
            if (netID === "137") {
                //alert("Polygon Network has already been added to Metamask.");
                return JSON.stringify({status: "OK"});;
            } else {
                params = [{
                    //chainId: '0x89',
                    chainId: '0xfa',
                    chainName: 'Matic Mainnet',
                    nativeCurrency: {
                        name: 'MATIC',
                        symbol: 'MATIC',
                        decimals: 18
                    },
                    rpcUrls: ['https://polygon-rpc.com/'],
                    blockExplorerUrls: ['https://polygonscan.com/']
                }]
            }
        } else {
            if (netID === "80001") {
                //alert("Polygon Mumbai Network has already been added to Metamask.");
                return JSON.stringify({status: "OK"});
            } else {
                params = [{
                    chainId: '0x13881',
                    chainName: 'Polygon Testnet',
                    nativeCurrency: {
                        name: 'MATIC',
                        symbol: 'MATIC',
                        decimals: 18
                    },
                    rpcUrls: ['https://matic-mumbai.chainstacklabs.com'],
                    blockExplorerUrls: ['https://mumbai.polygonscan.com/']
                }]
            }
        }
        
        window.ethereum.request({ method: 'wallet_addEthereumChain', params })
            .then((response) => {
              console.log('Success: ' , response);
              return response;
            })
            .catch((error) => console.log("Error: ", error.message));
    } else {
        alert('Unable to locate a compatible web3 browser!');
        return;
    }
} 
  

  // For now, 'eth_accounts' will continue to always return an array
  const handleAccountsChanged = (accounts) => {
    if (typeof (accounts[0]) === 'undefined'){
      disconnectAccount();
      
    } else if (accounts[0] !== getCurrentAccount('CurrentAccount')) {
      disconnectAccount();
      connectAccount(accounts[0]);
      
      // Do any other work!
    }
    window.location.reload();
  }

  const handleChainChanged = async (_chainId) => {
    // We recommend reloading the page, unless you must do otherwise
    if(_chainId==='0x13881'){
      
      localStorage.setItem('IsTestNet',JSON.stringify(true));
    }else{
      localStorage.setItem('IsTestNet',JSON.stringify(false));
    }
    
    console.log(_chainId);
    window.location.reload();
  }

  if(validateCurrentAccount('CurrentAccount') && typeof(window.ethereum) !== 'undefined'){
    // Note that this event is emitted on page load.
    // If the array of accounts is non-empty, you're already
    // connected.
    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);
  }
  
  

  const walletBtnOnClick = async (e) => {
    e.preventDefault();
    //is_testnet = JSON.parse(localStorage.getItem('IsTestNet'));
    if(!validateCurrentAccount('CurrentAccount')){
    
      if(typeof(window.ethereum) == 'undefined'){
        window.open("https://metamask.io/download/", "_self");
          
      }else if(window.ethereum.isConnected()){
        const result = await addNetwork();
        if(typeof(result) !== 'undefined'){

          await window.ethereum.request({ method: 'eth_requestAccounts' })
          .then((result) => {
            debugger;
            console.log("result: ", result);
            connectAccount(result[0]);
            window.location.href = "/generalView";
          })
          .catch((error) => {
            console.log("error: ", error);
          });
        }
      }
    }else{
      disconnectAccount();
      window.location.reload();
    }
    return;
  }

  const openCloseMenu = (x)=> {
    if(x){
      var cls = x.currentTarget.className;
      if(cls==='container'){
        x.currentTarget.className = 'container change';
        document.getElementsByClassName('sidebar hide')[0].className = 'sidebar';
        document.getElementsByClassName('outlet')[0].className = 'outlet';
        
      }else{
        x.currentTarget.className = 'container';
        document.getElementsByClassName('sidebar')[0].className = 'sidebar hide';
        document.getElementsByClassName('outlet')[0].className = 'outlet fullpage';
      }
    }
    return;
  }


  return (
    
    <>
    
    <div>
    
      <div>
      <div className="topnav">
          
          <div className="container" onClick={(event) => openCloseMenu(event)}>
          
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
            
          </div>
          
          {/* <NavLink to="/home" ><i className="fa fa-fw fa-home"></i> Home</NavLink>
          <NavLink style={shouldEnable?{display: ""}:{display: "none"}} to="/aboutUs" ><i className="fa fa-users"></i> About Us</NavLink>
          <NavLink style={shouldEnable?{display: ""}:{display: "none"}} to="/contact" ><i className="fa fa-compress"></i> Contact</NavLink> */}
          
          <div className="topnav-right">
            <NavLink to="#" onClick={(e) => {walletBtnOnClick(e)}} >
              {/* <i className="fa fa-money"></i> */}
               { walletAction }</NavLink>
          </div>
          
            
          
          <div style={shouldEnable?{display: ""}:{display: "none"}} className="dropdown">
            <button className="dropbtn"><span>Wallet </span>
              <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-content">
              <NavLink to="/generalView" >General View</NavLink>
              {/* <NavLink to="/option2" >Option 2</NavLink>
              <NavLink to="/option3" >Option 3</NavLink> */}
            </div>
          </div>
      </div>
      {/* Side Bar */}
      <div className="sidebar hide">
        <NavLink to="/home" ><FaHome /> Home</NavLink>
        <NavLink to="/resources" ><BsBox /> Resources</NavLink>
        
      </div>
      <div className="outlet fullpage">
 
        <Outlet context={[web3,setWeb3]}/>

      </div>
      </div>
    
    </div>
    
    </>
     
 
  );
  
};

export default Layout;