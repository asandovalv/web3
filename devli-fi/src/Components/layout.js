import { useContext, useEffect, useState} from "react";
import { Outlet, NavLink } from "react-router-dom";
import { validateCurrentAccount, connectAccount, disconnectAccount } from "../Services/Security/accounts";
import { BsBox } from 'react-icons/bs'
import { FaHome } from 'react-icons/fa'
import './layout.css'
import {changeNetwork, changeToDefaultNetwork, connectToDefaultNetwork, validateNetWork} from '../Resourses/Locals/defaults';
import { AppContext } from "../App";




function Layout() {
  const [web3, isTestNet, setIsTestNet] = useContext(AppContext);

   //Initialize text for wallet action button on top right window corner
  const [walletAction, setWalletAction] = useState(""); 

  let [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(async()=>{
    setIsAuthorized(await validateCurrentAccount(web3));
    if(typeof(web3) == 'undefined'){
      setWalletAction("Install Wallet");
    }else{
      if(isAuthorized){
        setWalletAction("Disconnect Wallet");
      }else{
        setWalletAction("Connect Wallet")
      }
    }
      

    const handleAccountsChanged = async (accounts) => {
      connectAccount(accounts[0]);
      disconnectAccount();
    }

    const handleChainChanged = async (chainId) => {
      await changeToDefaultNetwork(isTestNet, web3);
    }

    if(isAuthorized){
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
    }
  },[isAuthorized])
  

  const walletBtnOnClick = async (e) => {
    e.preventDefault();
    if(typeof(web3) == 'undefined'){
      window.open("https://metamask.io/download/", "_self");
    }
    setIsAuthorized(await validateCurrentAccount(web3));
    if(!isAuthorized){
          await changeNetwork(isTestNet);
          await connectToDefaultNetwork(isTestNet,web3);
    }else{
      disconnectAccount();
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