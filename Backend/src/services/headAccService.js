const bcrypt = require('bcryptjs');
const { headAccRepository } = require('../repository');
const { formatErrorResponse, isEmptyObject } = require('../helper/util');



const fetchUser = async (request) => {
    return await headAccRepository.fetchUserById(request.id);
}

const fetchAllUser = async (request) => {
    return await headAccRepository.fetchAllUser(request.id);
}

const addAgent = async (request) => {
    const { heada_code } = request;
    const isUnique = await headAccRepository.fetchUserById(heada_code);
    if (isUnique === null || isEmptyObject(isUnique)) {
        return await headAccRepository.addAgent(request);
    } else {
        throw formatErrorResponse("Agent Code is already present, please try new Code")
    }
}

const updateAgent = async (request) => {
    return await headAccRepository.updateAgent(request);
}

const deleteAgent = async (request) => {
    return await headAccRepository.deleteAgent(request);
}

const fetchAllBankType = async (request) => {
    return await headAccRepository.fetchAllBankType(request);
}

module.exports = {
    fetchUser,
    fetchAllUser,
    addAgent,
    updateAgent,
    deleteAgent,
    fetchAllBankType
}