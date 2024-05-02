const { isEmptyObject, formatErrorResponse } = require('../helper/util');
const { copyConfirmRepository } = require('../repository');


const fetchAllCopyConfirm = async (request) => {
    return await copyConfirmRepository.fetchAllCopyConfirm();
}

const updateCopyConfirm = async (request) => {
    return await copyConfirmRepository.updateCopyConfirm(request);
}

const createCopyConfirm = async (request) => {
    const { partyCode } = request;
    const isUnique = await copyConfirmRepository.fetchCopyConfirmById(partyCode);
    if (isUnique === null || isEmptyObject(isUnique)) {
        return await copyConfirmRepository.createCopyConfirm(request);
    } else {
        throw formatErrorResponse("Party Code is already present, please try new Code", 500)
    }
}

module.exports = {
    fetchAllCopyConfirm,
    updateCopyConfirm,
    createCopyConfirm
}