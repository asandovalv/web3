import { useContext, useEffect, useState} from "react";
import { Outlet, NavLink } from "react-router-dom";
import { validateCurrentAccount, connectAccount, disconnectAccount } from "../Services/Security/accounts";
import { BsBox } from 'react-icons/bs'
import { FaHome } from 'react-icons/fa'
import './layout.css'
import {changeNetwork, validateNetWork} from '../Resourses/Locals/defaults';
import { AppContext } from "../App";




function Layout() {
  const [web3, isTestNet, setIsTestNet] = useContext(AppContext);

   //Initialize text for wallet action button on top right window corner
  const [walletAction, setWalletAction] = useState(""); 

    

  let isAuthorized = false;

  useEffect(async()=>{
    isAuthorized = await validateCurrentAccount(web3);
    if(typeof(web3) == 'undefined'){
      setWalletAction("Install Wallet");
    }else{
      if(isAuthorized){
        setWalletAction("Disconnect Wallet");
      }else{
        setWalletAction("Connect Wallet")
      }
    }
      
// For now, 'eth_accounts' will continue to always return an array
const handleAccountsChanged = async (accounts) => {
  if (typeof (accounts[0]) === 'undefined'){
    disconnectAccount();
    window.location.href = '/home';
  } else if (isAuthorized) {
    disconnectAccount();
    connectAccount(accounts[0]);
    window.location.reload();
    // Do any other work!
  }
  
}

const handleChainChanged = async (chainId) => {
  // We recommend reloading the page, unless you must do otherwise
  let result = await validateNetWork(isTestNet,web3);
  debugger;
  if(!result){
    await changeNetwork(isTestNet);  
  }
  
  window.location.reload();
}

if(isAuthorized){
  // Note that this event is emitted on page load.
  // If the array of accounts is non-empty, you're already
  // connected.
  window.ethereum.on('accountsChanged', handleAccountsChanged);
  window.ethereum.on('chainChanged', handleChainChanged);
}
  },[])
  

  // async function addNetwork() {
  //   debugger;
  //   if (typeof web3 !== 'undefined') {
        
  //       var network = await web3.eth.net.getId();
  //       var netID = network.toString();
  //       var parms;
        

  //       if (!test) {
  //           if (netID === "137") {
  //               //alert("Polygon Network has already been added to Metamask.");
  //               return JSON.stringify({status: "OK"});
  //           }else{
  //             parms = [{
  //               chainId: '0x13881',
  //               chainName: 'Polygon Testnet',
  //               nativeCurrency: {
  //                   name: 'MATIC',
  //                   symbol: 'MATIC',
  //                   decimals: 18
  //               },
  //               rpcUrls: ['https://matic-mumbai.chainstacklabs.com'],
  //               blockExplorerUrls: ['https://mumbai.polygonscan.com/']
  //             }]
  //           }
  //       } else {
  //           if (netID === "80001") {
  //               //alert("Polygon Mumbai Network has already been added to Metamask.");
  //               return JSON.stringify({status: "OK"});
  //           }else{
  //             parms = [{
  //               //chainId: '0x89',
  //               chainId: '0xfa',
  //               chainName: 'Matic Mainnet',
  //               nativeCurrency: {
  //                   name: 'MATIC',
  //                   symbol: 'MATIC',
  //                   decimals: 18
  //               },
  //               rpcUrls: ['https://polygon-rpc.com/'],
  //               blockExplorerUrls: ['https://polygonscan.com/']
  //           }]
  //           }
  //       }
        
  //       window.ethereum.request({ method: 'wallet_addEthereumChain', parms })
  //           .then((response) => {
  //             console.log('Success: ' , response);
  //             window.location.reload();
  //           })
  //           .catch((error) => {
  //             console.log("Error: ", error.message)
  //             return;
  //           });
  //   } else {
  //       alert('Unable to locate a compatible web3 browser!');
  //       return;
  //   }
  // } 
  
  const walletBtnOnClick = async (e) => {
    e.preventDefault();
    if(typeof(web3) == 'undefined'){
      window.open("https://metamask.io/download/", "_self");
      return;   
    }
    let isValidated = await validateCurrentAccount(web3);
    if(!isValidated){
          let result = await changeNetwork(isTestNet);
          
            result = await web3.eth.requestAccounts();
            try{
              if(result){
                debugger;
                connectAccount(result[0]);
                window.location.href = "/walletView";
              }
            }catch(error){
              console.log("error: ", error);
              return;
            }
         
          
    }else{
      debugger;
      disconnectAccount();
      window.location.href = '/home';
    }
    
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
          <NavLink style={isAuthorized?{display: ""}:{display: "none"}} to="/aboutUs" ><i className="fa fa-users"></i> About Us</NavLink>
          <NavLink style={isAuthorized?{display: ""}:{display: "none"}} to="/contact" ><i className="fa fa-compress"></i> Contact</NavLink> */}
          
          <div className="topnav-right">
            <NavLink to="#" onClick={async(e) => {await walletBtnOnClick(e)}} >
              {/* <i className="fa fa-money"></i> */}
               { walletAction }</NavLink>
          </div>
          
            
          
          <div style={isAuthorized?{display: ""}:{display: "none"}} className="dropdown">
            <button className="dropbtn"><span>Wallet </span>
              <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-content">
              <NavLink to="/walletView" >General View</NavLink>
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
 
        <Outlet context={[web3]}/>

      </div>
      </div>
    
    </div>
    
    </>
     
 
  );
  
};

export default Layout;