const { formatErrorResponse, isEmptyObject } = require('../helper/util');
const { stateRepository } = require('../repository');


const fetchAllState = async (request) => {
    return await stateRepository.fetchAllState();
}

const createState = async (request) => {
    const { stateCode, stateName } = request;
    const isUnique = await stateRepository.fetchStateById(stateCode);
    if (isUnique === null || isEmptyObject(isUnique)) {
        const uniqueName = await stateRepository.fetchStateByName(stateName.toUpperCase());
        if (uniqueName === null || isEmptyObject(uniqueName)) {
            return await stateRepository.createState(request);
        } else {
            throw formatErrorResponse("State Name is already Present, Try different Name");
        }
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