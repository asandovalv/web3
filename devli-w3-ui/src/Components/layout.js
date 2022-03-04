import { Outlet, NavLink} from "react-router-dom";
import './layout.css'
function Layout(parm) {

  
  const userIsValid = parm.userIsValid;
  
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
  }
  return (
    
    <>
    <div>
    
      <div>
      <div className="topnav">
          
          <div style={userIsValid?{display: ""}:{display: "none"}} className="container" onClick={(event) => openCloseMenu(event)}>
          
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
            
          </div>

          <NavLink style={userIsValid?{display: ""}:{display: "none"}} to="/" activeClassName="active"><i className="fa fa-fw fa-home"></i> Home</NavLink>
          <NavLink style={userIsValid?{display: ""}:{display: "none"}} to="/aboutUs" activeClassName="active"><i className="fa fa-users"></i> About Us</NavLink>
          <NavLink style={userIsValid?{display: ""}:{display: "none"}} to="/contact" activeClassName="active"><i className="fa fa-compress"></i> Contact</NavLink>
          
          <div className="topnav-right">
            <NavLink to="/connectWallet" activeClassName="active"><i className="fa fa-money"></i> Conect Wallet</NavLink>
          </div>
          <div style={userIsValid?{display: ""}:{display: "none"}} className="dropdown">
            <button className="dropbtn">Dropdown 
              <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-content">
              <NavLink to="/link1" activeClassName="active">Link 1</NavLink>
              <NavLink to="/link2" activeClassName="active">Link 2</NavLink>
              <NavLink to="/link3" activeClassName="active">Link 3</NavLink>
            </div>
          </div>
      </div>
      {/* Side Bar */}
      <div style={userIsValid?{display: ""}:{display: "none"}} className="sidebar hide">
        <NavLink to="/" activeClassName="active"><i className="fa fa-fw fa-home"></i> Home</NavLink>
        <NavLink to="/link5" activeClassName="active"><i className="fa fa-fw fa-wrench"></i> Services</NavLink>
        <NavLink to="/link6" activeClassName="active"><i className="fa fa-fw fa-user"></i> Clients</NavLink>
        <NavLink to="/link7" activeClassName="active"><i className="fa fa-fw fa-envelope"></i> Contact</NavLink>
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