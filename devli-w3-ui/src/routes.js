import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Layout from './Components/layout'
import Home from './Components/Home/home'
import NotFound from './Components/NotFound/notFound'
import DownloadEthereumWallet from './Components/DownLoadEthereumWallet/downloadEthereumWallet'
import ConnectWallet from './Components/ConnectWallet/connectWallet'

const routes = (parm) =>
{
    
    function RequireAuth({ children }) {
        
        return true ? children : <Navigate to="/" replace />;
    }

    return (
    <>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout userIsValid={parm.userIsValid}/>}>
                <Route index element={<Home />} />
                <Route path="connectWallet" element={<ConnectWallet />} />
                {/*<Route path="blogs" element={<Blogs />} />
                <Route path="contact" element={<Contact />} />*/}
                <Route path="*" element={<RequireAuth><NotFound /></RequireAuth>} />
                <Route path="downloadEthereumWallet" element={<DownloadEthereumWallet />} />
            </Route>
        </Routes>
    </BrowserRouter>
    </>
    );
};

export default routes;