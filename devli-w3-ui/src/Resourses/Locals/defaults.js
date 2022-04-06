import appConfig from '../../config.json';
import { connectAccount, disconnectAccount } from '../../Services/Security/accounts';

const getDefaultNetwork = (isTestNet) => {
  let chainDefaultSettings;
    
  if(isTestNet){
    chainDefaultSettings = appConfig.maticTestNet;
  }else{
    chainDefaultSettings = appConfig.maticMainNet;
  }

  return chainDefaultSettings;
}

const validateNetWork = async (isTestNet, web3) => {
  if(typeof web3 != 'undefined'){

    const netId = await web3.eth.getChainId();
    debugger;
    let chainDefaultSettings = getDefaultNetwork(isTestNet);
    const result = web3.utils.hexToNumber(chainDefaultSettings[0].chainId) == netId;
    return result;
  }
  return false;
}

const changeNetwork = async (isTestNet) => {
  if (typeof window.ethereum === 'undefined') {
      return false;
  }
  let chainDefaultSettings = getDefaultNetwork(isTestNet);
  var params = JSON.parse(JSON.stringify(chainDefaultSettings));
  var response = await window.ethereum.request({ method: 'wallet_addEthereumChain', params})
  return response;
}
 
const connectToDefaultNetwork = async (isTestNet,web3) => {
  try{  
    if(!await validateNetWork(isTestNet,web3)){
      alert("Yoa have to be connected to our default network before continue!");
      return;
    }
    let result = await web3.eth.requestAccounts();
    debugger;
    if(result){
      connectAccount(result[0]);
      window.location.href = "/walletView";
    }
  }catch(error){
    if (error.code === 4001) {
      // EIP-1193 userRejectedRequest error
      console.log('Please connect to MetaMask.');
    } else {
      console.error(error);
    }
  }
}

const changeToDefaultNetwork = async (isTestNet,web3) =>{
  if(!await validateNetWork(isTestNet,web3)){
    disconnectAccount();
    window.location.href = '/home';
  }
  // let chainDefaultSettings = getDefaultNetwork();
  // var params = JSON.parse(JSON.stringify(chainDefaultSettings));
  // try {
  //   await window.ethereum.request({
  //     method: 'wallet_switchEthereumChain',
  //     params: [{ chainId: chainDefaultSettings.chainId }],
  //   });
  // } catch (switchError) {
  //   // This error code indicates that the chain has not been added to MetaMask.
  //   if (switchError.code === 4902) {
  //     try {
  //       await window.ethereum.request({
  //         method: 'wallet_addEthereumChain',
  //         params: params,
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   console.log(switchError);
  //}
}

export {validateNetWork, changeNetwork, connectToDefaultNetwork, changeToDefaultNetwork, getDefaultNetwork}