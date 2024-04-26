const { stateRepository } = require('../repository');


const fetchAllState = async (request) => {
    return await stateRepository.fetchAllState();
}



module.exports = {
    fetchAllState
}