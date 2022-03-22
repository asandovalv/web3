const ApiKey = '457MXR9M9WQSHTAEQX54JA5GIN6X9IPM2E';

const getListOfERC20TokenTransferEvents = async (address, contractAddress) =>{
    let url = 'https://api-testnet.polygonscan.com/api?module=account&action=tokentx&contractaddress=' + contractAddress + '&address=' + address + '&startblock=0&endblock=99999999&page=1&offset=5&sort=asc&apikey=' + ApiKey;
    const headers = { 'Content-Type': 'application/json' }
    fetch(url, headers)
    .then(response => {
      
        response.json().then (resJson => {
            if(resJson.status === ''){
                return JSON.stringify(resJson.result[0]);
            }
        })
    })
    .catch(err => {
        console.log(err);
        return;
    });
        
}

export { getListOfERC20TokenTransferEvents };