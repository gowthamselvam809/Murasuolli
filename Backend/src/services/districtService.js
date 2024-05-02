const { formatErrorResponse, isEmptyObject } = require('../helper/util');
const { districtRepository } = require('../repository');


const fetchAllDistrict = async (request) => {
    return await districtRepository.fetchAllDistrict();
}

const createDistrict = async (request) => {
    const { areaCode } = request;
    const isUnique = await districtRepository.fetchDistrictById(areaCode);
    if (isUnique === null || isEmptyObject(isUnique)) {
        return await districtRepository.createDistrict(request);
    } else {
        throw formatErrorResponse("District Code is already Present, Try different Code");

    }
}

const updateDistrict = async (request) => {
    return await districtRepository.updateDistrict(request);
}


module.exports = {
    fetchAllDistrict,
    createDistrict,
    updateDistrict
}