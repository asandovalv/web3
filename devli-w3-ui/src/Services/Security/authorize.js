import { Navigate } from "react-router-dom";
import { validateCurrentAccount } from "./accounts";

 const Authorize = ({ children }) => {
     
    if(validateCurrentAccount('CurrentAccount')){
        return children;
    }
    return <Navigate to="../notAuthorized" replace />;
};

export default Authorize;