const { isEmptyObject, formatErrorResponse } = require('../helper/util');
const { magazineRepository } = require('../repository');

const fetchAllMagazine = async (request) => {
    return await magazineRepository.fetchAllMagazine();
}

const updateMagazine = async (request) => {
    return await magazineRepository.updateMagazine(request);
}

const createMagazine = async (request) => {
    const { magId } = request;
    const isUnique = await magazineRepository.fetchMagazineById(magId);
    if (isUnique === null || isEmptyObject(isUnique)) {
        return await magazineRepository.createMagazine(request);
    } else {
        throw formatErrorResponse("Magazine ID is already present, please try new ID")
    }
}

module.exports = {
    fetchAllMagazine,
    updateMagazine,
    createMagazine
}