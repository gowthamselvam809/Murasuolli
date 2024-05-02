const { formatErrorResponse, isEmptyObject } = require('../helper/util');
const { stateRepository } = require('../repository');


const fetchAllState = async (request) => {
    return await stateRepository.fetchAllState();
}

const createState = async (request) => {
    const { stateCode } = request;
    const isUnique = await stateRepository.fetchStateById(stateCode);
    if (isUnique === null || isEmptyObject(isUnique)) {
        return await stateRepository.createState(request);
    } else {
        throw formatErrorResponse("State Code is already Present, Try different Code");

    }
}

const updateState = async (request) => {
    return await stateRepository.updateState(request);
}



module.exports = {
    fetchAllState,
    createState,
    updateState
} 