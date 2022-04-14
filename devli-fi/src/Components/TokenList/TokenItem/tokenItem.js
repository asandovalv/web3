import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../App";
import { getERC20TokenAccountBalance } from "../../../Resourses/Services/polygonMaticService";
import abi from 'erc-token-abis/abis/ERC20Base.json';
import './tokenItem.css'
import { Toast } from "bootstrap";
import { BsKey, BsCoin } from 'react-icons/bs'
import { FaPaperPlane } from 'react-icons/fa'

const TokenItem = ({ token, filter= () => false }) => {
    const [web3, isTestNet, currentAccount, notify] = useContext(AppContext);
    
    const [tokenBalance, setTokenBalance] = useState("0")
    
    // The minimum ABI required to get the ERC20 Token balance
    const minABI = JSON.parse(JSON.stringify(abi));
    const contract = new web3.eth.Contract(minABI, token.address);    
    
    const [toAddress, setToAddress] = useState('');
    const [amount, setAmount] = useState('');

    const getBalance = async (contract) => {
        const balance = await contract.methods.balanceOf(currentAccount).call(); // 29803630997051883414242659
        if(balance){
            const formatBalance = web3.utils.fromWei(balance); // 29803630.997051883414242659
            setTokenBalance(formatBalance);
            console.log(formatBalance);
        }
    }
    
    const send = async (e) => {
        e.preventDefault();
        const tokenAddress = token.address;
        const fromAddress = currentAccount;
      try{
        if(!web3.utils.isAddress(toAddress)){
            notify("Invalid Address!", {
                                type: 'error',
                theme: 'dark',
                bodyStyle: { height: "auto" },
                onClick: () => { }
            });
            return;
        }
        // calculate ERC20 token amount
        
        let tokenAmount = web3.utils.toBN(amount * Math.pow(10,token.decimals));
        console.log(tokenAmount);
        // The gas price is determined by the last few blocks median gas price.
        const avgGasPrice = await web3.eth.getGasPrice();
        /**
        * With every new transaction you send using a specific wallet address,
        * yoneed to increase a nonce which is tied to the sender wallet.
        */
        let nonce = await web3.eth.getTransactionCount(fromAddress);
        // Will call estimate the gas a method execution will take when executed in the EVM without.
        
        let estimateGas = await web3.eth.estimateGas({
            value: token.tags[1] === "plasma" ? tokenAmount : '0x0',
            data: await contract.methods.transfer(toAddress, tokenAmount).encodeABI(),
            from: fromAddress,
            to: tokenAddress
        });
        
        console.log(tokenAddress);
        console.log(fromAddress);
        console.log(toAddress);
        console.log(tokenAmount);
        console.log(avgGasPrice);
        console.log(nonce);
        console.log(estimateGas);
        console.log(Math.round(estimateGas * 1.1));
        // using the event emitter
        web3.eth.sendTransaction({
            from: fromAddress,
            to: tokenAddress,
            value: token.tags[1] === "plasma" ? tokenAmount : '0x0',
            gas: web3.utils.toHex(Math.round(estimateGas * 1.1)),
            gaslimit: web3.utils.toHex(Math.round(estimateGas * 1.1)),
            gasPrice: avgGasPrice,
            data: await contract.methods.transfer(toAddress, tokenAmount).encodeABI(),
        }).on('error', (error)=>{
            notify("Transaction Error! " + error.message, {
                type: 'error',
                theme: 'dark',
                bodyStyle: { height: "auto" },
                onClick: () => { }});
                console.log(error);
            }) // If a out of gas error, the second parameter is the receipt.
            .then(function(receipt){
                notify("Transaction Successful!", {
                    type: 'success', 
                    theme: 'dark', 
                    onClick: () => {window.location.href='https://blockscan.com/tx/' + receipt.transactionHash }});
                    console.log(receipt);
                });
            }catch(ex){
                notify(ex, {
                    type: 'error',
                    theme: 'dark',
                    bodyStyle: { height: "auto" },
                    onClick: () => { }});
                    console.log(ex);
            }
            }
            
            
            useEffect(
                () => {
                    const getTokenBalance = async () => {
                        
                        await getBalance(contract);
                        //Call for API end point on mumbai or Matic mainnet that enables until 5 tx/s for a free account. 
                        //Key is set up in config.js
                        //const token_balance = await getERC20TokenAccountBalance(current_account, token.address);
                    }
                    if (token && currentAccount) {
                        getTokenBalance()
                    }
                }, [token, currentAccount])
                
                
                if (filter(tokenBalance)) {
                    return null;
                }
                
                
                return (
                    <>
                    <div className="flip-card">
                    <div className="flip-card-inner">
                    <div className="flip-card-front">
                    <img className="token-image" style={{ backgroundImage: `url(${token?.logoURI})` }} />
                    
                    </div>
                    <div className="flip-card-back">
                    <form>
                
  
  <div className="input-container">
      <span>
  <BsKey style={{width: "2vw", height: "2vw", margin: "5px"}}/>
  </span>
    <input className="input-field" type="text" placeholder="Account" name="account" value={toAddress} onChange={e => setToAddress(e.target.value)} required/>
  </div>

  <div className="input-container">
    <BsCoin style={{width: "2vw", height: "2vw", margin: "5px"}}/>
    <input className="input-field" type="number" min="0.000000000000000001" step="0.000000000000000001" title="Amount" pattern="^\d+(?:\.\d{0,18})?$" 
 placeholder="Amount" name="amount" value={amount} onChange={e => {setAmount(e.target.value)}} required/>
  </div>

  <button onClick={(e)=>{send(e)}} className="btn"> Send <FaPaperPlane /></button>
</form>
              
                    </div>
                    </div>
                    <h3> {token?.name} </h3>
                    <p className="title"> {token?.symbol} </p>
                    <h3>Balance</h3>
                    <p> {tokenBalance} </p>
                    {/* <a href="#"><i class="fa fa-dribbble"></i></a>
                    <a href="#"><i class="fa fa-twitter"></i></a>
                    <a href="#"><i class="fa fa-linkedin"></i></a>
                <a href="#"><i class="fa fa-facebook"></i></a> */}
                <p><button>Details</button></p>
                </div>
                </>
                );
            }
            
            export default TokenItem