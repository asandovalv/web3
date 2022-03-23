
import appconfig from '../../config.json' 

const _apikey = appconfig.polygonmaticapikey;
const _apiurl = appconfig.polygonmaticapiurl;

const getListOfERC20TokenTransferEvents = async (_address, _contractaddress) =>{
    const _module = 'account';
    const _action = 'tokentx';
    const _startblock = '0';
    const _endblock = '99999999';
    const _page = '1';
    const _offset = '5';
    const _sort = 'asc';
    
    let _uri = _apiurl + '?module=' + _module + '&action=' + _action + '&contractaddress=' 
        + _contractaddress + '&address=' + _address + '&startblock=' + _startblock + '&endblock=' + _endblock + '&page=' + _page 
        + '&offset=' + _offset + '&sort=' + _sort + '&apikey=' + _apikey;

    const _headers = { 'Content-Type': 'application/json' }

    return fetch(_uri, _headers);
    
        
}

const getERC20TokenAccountBalance = async (_address, _contractaddress) =>{
    const _module = 'account';
    const _action = 'tokenbalance';
    const _tag = 'lastest';
    
    
    let _uri = _apiurl + '?module=' + _module + '&action=' + _action + '&contractaddress=' 
        + _contractaddress + '&address=' + _address + '&startblock=' + '&tag=' + _tag + '&apikey=' + _apikey;

    const _headers = { 'Content-Type': 'application/json' }

    return fetch(_uri, _headers);
    
        
}

export { getListOfERC20TokenTransferEvents, getERC20TokenAccountBalance };