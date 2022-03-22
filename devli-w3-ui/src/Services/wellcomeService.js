
import { getListOfERC20TokenTransferEvents } from "../Resourses/Services/polygonApi";


const getAccountTokenList = async (contractAddress) => {
    
        let account = localStorage.getItem('CurrentAccount');
    
        return await getListOfERC20TokenTransferEvents(account, contractAddress);

}

export { getAccountTokenList };