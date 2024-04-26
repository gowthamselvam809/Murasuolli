const apiClient = require('./httpCommon');
const { apiRoutes: {Url, apiRoutes} } = require('../helper')

const googlePostApiCall = async (data) => await apiClient.postAPICall(Url.baseAPIUrl + apiRoutes.userLogin, data).then(res => res.data);
const googleGetApiCall = async (data) => await apiClient.getAPICall(Url.baseAPIUrl + apiRoutes.userRegister, data).then(res => res.data);

module.exports = {
    googlePostApiCall,
    googleGetApiCall
}
