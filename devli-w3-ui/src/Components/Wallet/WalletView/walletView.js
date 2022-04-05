import React, { useContext } from 'react';
import { AppContext } from '../../../App';
//import { useOutletContext } from 'react-router-dom';
import TokenList from '../../TokenList/tokenList';
import './walletView.css'

const WalletView = () => { 
    
    //const [web3] = useOutletContext();
    //console.log("WalletView: ",web3);
    return (
        <>
            {/* <TokenList web3={web3}/> */}
            <TokenList />
        </>
    );
}

export default WalletView;