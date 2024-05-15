const { formatErrorResponse, isEmptyObject, isEmptyArray } = require('../helper/util');
const { districtRepository } = require('../repository');


const fetchAllDistrict = async (request) => {
    return await districtRepository.fetchAllDistrict();
}

const createDistrict = async (request) => {
    const { areaCode, stCode, areaName } = request;
    const isUnique = await districtRepository.fetchDistrictById(areaCode);
    if (isUnique === null || isEmptyObject(isUnique)) {
        const uniqueDistrict = await districtRepository.fetchDistrictByStateId(stCode);
        if (isEmptyArray(uniqueDistrict) || isEmptyArray(uniqueDistrict.filter((dis) => dis.areaName === areaName.toUpperCase()))) {
            return await districtRepository.createDistrict(request);
        } else {
            throw formatErrorResponse("District Name is already present, Try new Name")
        }
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