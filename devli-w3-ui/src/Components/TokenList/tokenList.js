import React, { Fragment, useState, useEffect } from "react";
import { getCurrentAccount } from '../../Services/Security/accounts'
import TOKEN_LIST from '../../Assets/tokens/testnetTokens.json'
import { getERC20TokenAccountBalance } from '../../Resourses/Services/polygonMaticService';
import './tokenList.css'
import TokenItem from "./TokenItem/tokenItem";


const TokenList = (parms) => {
    debugger;
    //console.log("TokenList: ",web3);
    const current_account = getCurrentAccount('CurrentAccount');

    const filter = (tokenBalance) => {
        return tokenBalance?.result === "0"
    }



    return (

        <>
            <div className="token-list-wrap">
                <div className="token-list">
                    {TOKEN_LIST.map(token => 
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