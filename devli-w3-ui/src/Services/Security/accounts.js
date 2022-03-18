

const validateCurrentAccount = (value) => {
    return localStorage.getItem(value)?true:false;
}

const getCurrentAccount = (value) => {
    const currentAccount = localStorage.getItem(value);
    return currentAccount?JSON.stringify(currentAccount):null;
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
    setCurrentAccount(value,{accountAddress:value});
    return;
}

const disconnectAccount = () => {
    const accountAddres = getCurrentAccount('CurrentAccount');
    localStorage.removeItem('CurrentAccount');
    localStorage.removeItem(accountAddres);
    return;
}
export {validateCurrentAccount, getCurrentAccount, setCurrentAccount, connectAccount, disconnectAccount};