import { useState } from 'react';

const useWeb3ConnectorStorage = (key, initialValue) => {
    
    const [storeValue, setStoreValue] = useState(() =>{
        try{
            debugger;
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        }catch(error){
            return initialValue;
        }
    });

    const setValue = (value) => {
        try{
            debugger;
            setStoreValue(value);
            localStorage.setItem(key,JSON.stringify(initialValue));
        }catch(error){
            console.log(error);
        }
    }
    return [storeValue, setValue];
}

export default useWeb3ConnectorStorage;