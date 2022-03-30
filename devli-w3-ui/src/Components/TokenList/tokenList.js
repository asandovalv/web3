import React, { Fragment, useState, useEffect } from "react";
import { getCurrentAccount } from '../../Services/Security/accounts'
import ALL_TOKEN_LIST from '../../Assets/tokens/allTokens.json'
import DEFAULT_TOKEN_LIST from '../../Assets/tokens/default.json'
import TEST_TOKEN_LIST from '../../Assets/tokens/testnetTokens.json'
import { getERC20TokenAccountBalance } from '../../Resourses/Services/polygonMaticService';
import appConfig from '../../config.json'
import './tokenList.css'
import TokenItem from "./TokenItem/tokenItem";


const TokenList = (parms) => {
    
    //console.log("TokenList: ",web3);
    const current_account = getCurrentAccount('CurrentAccount');

    const filter = (tokenBalance) => {
        //return tokenBalance === "0";
        return false;
    }

    var is_testnet = JSON.parse(localStorage.getItem('IsTestNet'));
console.log(is_testnet);
    return (

        <>
            <div className="token-list-wrap">
                <div className="token-list">
                    {((typeof(is_testnet) === 'undefined' || is_testnet)?TEST_TOKEN_LIST:DEFAULT_TOKEN_LIST).map(token => 
                        <TokenItem key={token.address} 
                                    token={token} 
                                    current_account={current_account} 
                                    parms={parms}
                                    filter={filter} 
                        />)}
                </div>
            </div>
        </>
    );

}

export default TokenList;