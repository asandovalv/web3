import { AppContext } from "../../App";


const validateCurrentAccount = async (web3) => {
    const currentAccount = localStorage.getItem('CurrentAccount');
    if(typeof web3 === 'undefined' || currentAccount == null) return false;
    const accounts = await web3.eth.getAccounts();
    return accounts[0] === currentAccount;
}

const getCurrentAccount = (value) => {
    const currentAccount = localStorage.getItem(value);
    return currentAccount?currentAccount:null;
}

const setCurrentAccount = (value, obj) => {
    try{
        localStorage.setItem(value,obj);
    }catch(ex){
        console.log(ex);
    }
    
    return;
}

const connectAccount = (value) => {
    setCurrentAccount('CurrentAccount',value);
    return;
}

const disconnectAccount = () => {
    localStorage.removeItem('CurrentAccount');
    window.location.href = '/home';
    return;
}
export {validateCurrentAccount, getCurrentAccount, setCurrentAccount, connectAccount, disconnectAccount};