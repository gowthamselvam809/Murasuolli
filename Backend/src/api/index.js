const {getAPICall, postAPICall, putAPICall, deleteAPICall} = require('./httpCommon'); 
const {googlePostApiCallWithUrl, googleGetApiCallWithUrl} = require('./googleOAuthApi'); 
const {googlePostApiCall, googleGetApiCall} = require('./commonApi'); 

module.exports = {
    getAPICall,
    postAPICall,
    putAPICall,
    deleteAPICall, 

    googlePostApiCall, 
    googleGetApiCall, 
    googleGetApiCallWithUrl, 
    googlePostApiCallWithUrl
}
