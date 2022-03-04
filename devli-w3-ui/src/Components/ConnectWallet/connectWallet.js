import { Navigate } from "react-router-dom";

const connectWallet = () => {
    const validateEthereum = () => {
        if(!window.ethereum){
            <Navigate to="/downloadEthereumWallet" replace/>
        }
    }
    validateEthereum();
    return <h1>This is your Wallet Connection!</h1>
}

export default connectWallet;