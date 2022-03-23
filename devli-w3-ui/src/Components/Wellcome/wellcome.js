import { Fragment, useEffect, useState } from 'react';
import React from 'react';
import ReactDOM from 'react-dom';
import tokenlist from '../../Assets/tokens/testnetTokens.json'
import { getListOfERC20TokenTransferEvents, getERC20TokenAccountBalance } from '../../Resourses/Services/polygonMaticService';
import { getCurrentAccount } from '../../Services/Security/accounts';
import Cards from '../Cards/cards';
import './wellcome.css'
class Wellcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {_currentaccount: getCurrentAccount('CurrentAccount'),
        _cards: [],
        _data: []};
      }
    
    componentDidMount() {
       
        tokenlist.forEach(async (element) => {
            const _contractaddress = element.address;
            
            await getERC20TokenAccountBalance(this.state._currentaccount, _contractaddress)
            .then(async (response) => {
                response.json()
                .then (async resJson => {
                    if(resJson.status === '1' && resJson.result > 0){
                        let data=[];
                        console.log(JSON.stringify(resJson));
                        
                        
                        this.state._cards.push({name: element.name, logoURI: element.logoURI, symbol:element.symbol, balance:resJson.result});
                        
                        this.state._cards.forEach(async(c)=>{
                                
                                var importIcon =  await import('../../Assets/icons/' + c.logoURI + '.svg');
                                data.push(
                                <>
                                    <div className="flip-card">
                                        <div className="flip-card-inner">
                                            <div className="flip-card-front">
                                                <img src={ importIcon.default } alt="Avatar" style={{width:"300px",height:"300px"}}/> 
                                            </div>
                                            <div className="flip-card-back">
                                                <h1>{c.name}</h1>
                                                <h3>{c.symbol}</h3>
                                                <p>Balance</p>
                                                <p>{c.balance}</p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                                
                                );
                                this.setState({_data:data})
                               
                            });
                        
                        
                        
                    }
                })
            })
            .catch(err => {
                console.log(err);
                
            });
            
        });
        

    }

   
    
    render(){
        return (
            
            <>
                <div className="cardslist">{this.state._data}</div>
                <div>
                    <h1>Wellcome to Devli-Fi Web 3.0</h1>
                    <h5>Table of resources to be used:</h5>
                    <h3>Add <a href="https://polygonscan.com/"><b>POLIGON MATIC (mainnet)</b></a></h3>
                    <h3>Explore <a href="https://polygonscan.com/"><b></b> into POLYGON SCAN - (mainnet)</a></h3>
                    <h3>Add <a href="https://mumbai.polygonscan.com/"><b>POLIGON MATIC (mumbai) - TEST</b></a></h3>
                    <h3>Add <a href="https://faucet.polygon.technology/"><b>BALANCE</b> into Matic Testnet</a></h3>
                    <h3>Explore <a href="https://mumbai.polygonscan.com/"><b></b> into POLYGON SCAN - (mumbai)</a></h3>
                </div>
            </>
        );
    }
}

export default Wellcome;