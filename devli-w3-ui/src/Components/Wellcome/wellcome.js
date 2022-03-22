import { useEffect } from 'react';
import { getAccountTokenList } from '../../Services/wellcomeService';
import TEST_NET_TOKENS_JSON from '../../Assets/tokens/testnetTokens.json'

const Wellcome = () => {
    
    useEffect(async ()=>{
        TEST_NET_TOKENS_JSON.forEach(async element => {
            let result = await getAccountTokenList(element.address);
            console.log(result);
        });

    });

    return (
        <>
            <h1>Wellcome to Devli-Fi Web 3.0</h1>
            <h5>Table of resources to be used:</h5>
            <h3>Add <a href="https://polygonscan.com/"><b>POLIGON MATIC (mainnet)</b></a></h3>
            <h3>Explore <a href="https://polygonscan.com/"><b></b> into POLYGON SCAN - (mainnet)</a></h3>
            <h3>Add <a href="https://mumbai.polygonscan.com/"><b>POLIGON MATIC (mumbai) - TEST</b></a></h3>
            <h3>Add <a href="https://faucet.polygon.technology/"><b>BALANCE</b> into Matic Testnet</a></h3>
            <h3>Explore <a href="https://mumbai.polygonscan.com/"><b></b> into POLYGON SCAN - (mumbai)</a></h3>
            
        </>
    );
}
export default Wellcome;