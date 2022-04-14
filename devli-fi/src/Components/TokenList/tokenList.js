import React, { Fragment, useState, useEffect, useContext } from "react";
import { getCurrentAccount } from '../../Services/Security/accounts'
import ALL_TOKEN_LIST from '../../Assets/tokens/allTokens.json'
import DEFAULT_TOKEN_LIST from '../../Assets/tokens/default.json'
import TEST_TOKEN_LIST from '../../Assets/tokens/testnetTokens.json'
import { getERC20TokenAccountBalance } from '../../Resourses/Services/polygonMaticService';
import appConfig from '../../config.json'
import './tokenList.css'
import TokenItem from "./TokenItem/tokenItem";
import { AppContext } from "../../App";


const TokenList = (parms) => {
    const [web3, isTestNet, currentAccount] = useContext(AppContext);
    //console.log("TokenList: ",web3);

    const filter = (tokenBalance) => {
        return tokenBalance === "0";
    }

    return (

        <>
            <div className="token-list-wrap">
                <div className="token-list">
                    {(isTestNet?TEST_TOKEN_LIST:DEFAULT_TOKEN_LIST).map(token => 
                        <TokenItem key={token.address} 
                                    token={token} 
                                    filter={filter} 
                        />)}
                </div>
            </div>
        </>
    );

}

export default TokenList;