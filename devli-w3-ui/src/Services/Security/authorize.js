import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../../App";
import { validateCurrentAccount } from "./accounts";

 const Authorize = ({ children }) => {
    const [web3] = useContext(AppContext); 
    useEffect(async()=>{
        if(! await validateCurrentAccount(web3)){
            return window.location.href = '../notAuthorized';
        }
    })
    return children;
};

export default Authorize;