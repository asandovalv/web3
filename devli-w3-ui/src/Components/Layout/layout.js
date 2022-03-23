import { useEffect, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { validateCurrentAccount, connectAccount, disconnectAccount, getCurrentAccount} from "../../Services/Security/accounts";
import './layout.css'

function Layout() {
  let shouldEnable = validateCurrentAccount('CurrentAccount');

  const [walletAction, setWalletAction] = useState(""); 
  
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

  const handleChainChanged = (_chainId) => {
    // We recommend reloading the page, unless you must do otherwise
    window.location.reload();
  }

  if(validateCurrentAccount('CurrentAccount')){
    // Note that this event is emitted on page load.
    // If the array of accounts is non-empty, you're already
    // connected.
    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);
  }
  
  
  

  const walletBtnOnClick = async (e) => {
    e.preventDefault();
    if(!validateCurrentAccount('CurrentAccount')){
    
      if(typeof(window.ethereum) == 'undefined'){
        window.open("https://metamask.io/download/", "_self");
          
      }else if(window.ethereum.isConnected()){
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        .then((result) => {
          debugger;
          console.log("result: ", result);
          connectAccount(result[0]);
          window.location.href = "/Wellcome";
        })
        .catch((error) => {
          console.log("error: ", error);
        });
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
          
          <div style={shouldEnable?{display: ""}:{display: "none"}} className="container" onClick={(event) => openCloseMenu(event)}>
          
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
            
          </div>

          <NavLink to="/" ><i className="fa fa-fw fa-home"></i> Home</NavLink>
          <NavLink style={shouldEnable?{display: ""}:{display: "none"}} to="/aboutUs" ><i className="fa fa-users"></i> About Us</NavLink>
          <NavLink style={shouldEnable?{display: ""}:{display: "none"}} to="/contact" ><i className="fa fa-compress"></i> Contact</NavLink>
          
          <div className="topnav-right">
            <NavLink to="#" onClick={(e) => {walletBtnOnClick(e)}} >
              {/* <i className="fa fa-money"></i> */}
               { walletAction }</NavLink>
          </div>
          <div style={shouldEnable?{display: ""}:{display: "none"}} className="dropdown">
            <button className="dropbtn">Options 
              <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-content">
              <NavLink to="/option1" >Option 1</NavLink>
              <NavLink to="/option2" >Option 2</NavLink>
              <NavLink to="/option3" >Option 3</NavLink>
            </div>
          </div>
      </div>
      {/* Side Bar */}
      <div style={shouldEnable?{display: ""}:{display: "none"}} className="sidebar hide">
        <NavLink to="/" ><i className="fa fa-fw fa-home"></i> Home</NavLink>
        <NavLink to="/services" ><i className="fa fa-fw fa-wrench"></i> Services</NavLink>
        <NavLink to="/aboutUs" ><i className="fa fa-fw fa-user"></i> About Us</NavLink>
        <NavLink to="/contactUs" ><i className="fa fa-fw fa-envelope"></i> Contact Us</NavLink>
      </div>
      <div className="outlet fullpage">
        <Outlet />
      </div>
      </div>
    
    </div>
         
    </>
 
  );
  
};

export default Layout;