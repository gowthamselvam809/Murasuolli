const axios = require('axios')

const getAPICall = async (url, data) => await axios.get(url, data);
const postAPICall = async (url, data) => await axios.post(url, data);
const putAPICall = async (url, data) => await axios.put(url, data);
const deleteAPICall = async (url, data) => await axios.delete(url, data);

const getAPICallWithUrl = async (url) => await axios.post(url);
const postAPICallWithUrl = async (url) => await axios.post(url);

module.exports = {
    getAPICall,
    postAPICall,
    putAPICall,
    deleteAPICall,

    getAPICallWithUrl, 
    postAPICallWithUrl
}
