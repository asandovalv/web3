import React, { useEffect, useState } from "react";
import { getERC20TokenAccountBalance } from "../../../Resourses/Services/polygonMaticService";
import './tokenItem.css'

const TokenItem = ({ token, current_account, parms,  filter= () => false }) => {
    const [tokenBalance, setTokenBalance] = useState()
    const web3 = parms.web3;
    const setWeb3 = parms.setWeb3;
    
    useEffect(
    () => {
        const getTokenBalance = async () => {
            //const web3 = new Web3(new Web3.providers.HttpProvider(testnet));
            // var wei = await web3.eth.getBalance(token.address); //Will give value in.
            // var balance = web3.utils.fromWei(wei, 'ether');
            // console.log(balance + " ETH");
            const token_balance = await getERC20TokenAccountBalance(current_account, token.address);
            setTokenBalance(token_balance);
        }
        if (token && current_account) {
            getTokenBalance()
        }
    }, [token, current_account])

    
    // if (filter(tokenBalance)) {
    //     return null
    // }

    return <>
        <div className="flip-card">
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <img className="token-image" style={{ backgroundImage: `url(${token?.logoURI})` }} />

                </div>
                <div className="flip-card-back">
                    <h1>{token?.name}</h1>
                    <h3>{token?.symbol}</h3>
                    <p>Balance</p>
                    <p>{tokenBalance?.result}</p>
                </div>
            </div>
            <h1> {token?.name} </h1>
            <p className="title"> {token?.symbol} </p>
            <h3>Balance</h3>
            <p> {tokenBalance?.result} </p>
            {/* <a href="#"><i class="fa fa-dribbble"></i></a>
                                <a href="#"><i class="fa fa-twitter"></i></a>
                                <a href="#"><i class="fa fa-linkedin"></i></a>
                                <a href="#"><i class="fa fa-facebook"></i></a> */}
            <p><button>Details</button></p>
        </div>
    </>
}

export default TokenItem