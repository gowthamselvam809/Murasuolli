const { commissionRepository } = require('../repository');
const { isEmptyArray, formatErrorResponse, isEmptyObject } = require('../helper/util');


const fetchAllCommission = async (request) => {
    return await commissionRepository.fetchAllCommission();
}

const updateCommission = async (request) => {
    return await commissionRepository.updateCommission(request);
}

const createCommission = async (request) => {
    const { commId } = request;
    const isUnique = await commissionRepository.fetchCommissionById(commId);
    if (isUnique === null || isEmptyObject(isUnique)) {
        return await commissionRepository.createCommission(request);
    } else {
        throw formatErrorResponse("Comm ID is already Present, Try different ID");
    }
}

module.exports = {
    fetchAllCommission,
    updateCommission,
    createCommission
}