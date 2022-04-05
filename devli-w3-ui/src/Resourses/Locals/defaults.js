import appConfig from '../../config.json';

const validateNetWork = async (isTestNet, web3) => {
  if(typeof web3 != 'undefined'){

    const netId = await web3.eth.getChainId();
    debugger;
    let chainDefaultSettings;
    
    if(isTestNet){
      chainDefaultSettings = JSON.parse(appConfig.maticTestNet);
    }else{
      chainDefaultSettings = JSON.parse(appConfig.maticMainNet);
    }
    const result = web3.utils.hexToNumber(chainDefaultSettings[0].chainId) == netId;
    return result;
  }
  return false;
}

const changeNetwork = async (isTestNet) => {
  var chainDefaultSettings;
  
  if(isTestNet){
    chainDefaultSettings = appConfig.maticTestNet;
  }else{
    chainDefaultSettings = appConfig.maticMainNet;
  }
  
  
  if (typeof window.ethereum === 'undefined') {
      return false;
  }
  var params = JSON.parse(JSON.stringify(chainDefaultSettings));
  var response = await window.ethereum.request({ method: 'wallet_addEthereumChain', params})
  return response;
}
  

export {validateNetWork, changeNetwork}