const apiClient = require('./httpCommon');

const googleGetApiCallWithUrl = async (url) => await apiClient.getAPICallWithUrl(url).then(res => res.data);

const googlePostApiCallWithUrl = async (url) => await apiClient.postAPICallWithUrl(url).then(res => res.data);

module.exports = {
    googleGetApiCallWithUrl, 
    googlePostApiCallWithUrl
}
