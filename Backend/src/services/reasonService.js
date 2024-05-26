const { isEmptyObject, formatErrorResponse } = require('../helper/util');
const { reasonRepository } = require('../repository');


const fetchAllReason = async (request) => {
    return await reasonRepository.fetchAllReason(request);
}

const updateReason = async (request) => {
    return await reasonRepository.updateReason(request);
}

const createReason = async (request) => {
    const { reasonId } = request;
    const isUnique = await reasonRepository.fetchReasonById(reasonId);
    if (isUnique === null || isEmptyObject(isUnique)) {
        return await reasonRepository.createReason(request);
    } else {
        throw formatErrorResponse("Reason ID is already present, please try new ID")
    }
}

const fetchReasonForDropdown = async (request) => {
    return await reasonRepository.fetchReasonForDropdown(request);
}

module.exports = {
    fetchAllReason,
    updateReason,
    createReason,
    fetchReasonForDropdown
}