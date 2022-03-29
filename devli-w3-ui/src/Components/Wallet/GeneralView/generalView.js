import React from 'react';
import { useOutletContext } from 'react-router-dom';
import TokenList from '../../TokenList/tokenList';
import './generalView.css'

const GeneralView = () => { 
    const [web3, setWeb3] = useOutletContext();
    console.log("GeneralView: ",web3);
    return (
        <>
            <TokenList web3={web3} setWeb3={setWeb3}/>
        </>
    );
}

export default GeneralView;