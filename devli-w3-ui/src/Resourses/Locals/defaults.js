import appConfig from '../../config.json';

function setDefaultNetworkSettings(chainId){
    if(chainId==='0x13881'){
        localStorage.setItem('DefaultNetworkSettings',JSON.stringify(appConfig.maticMainNet));
      }else{
        localStorage.setItem('DefaultNetworkSettings',JSON.stringify(appConfig.maticTestNet));
      }
    return; 
}

function getDefaultNetworkSettings(){
    const defaultNetworkSettings = JSON.parse(localStorage.getItem('DefaultNetworkSettings'));
    return defaultNetworkSettings;
}

function isTestNet(){
    const defaultNetworkSettings = getDefaultNetworkSettings();
    debugger;
    return defaultNetworkSettings?.chainId==='0x13881'?true:false;
}

export {setDefaultNetworkSettings, getDefaultNetworkSettings,isTestNet}