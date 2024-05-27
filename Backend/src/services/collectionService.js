const { isEmptyObject, formatErrorResponse } = require('../helper/util');
const { collectionRepository } = require('../repository');


const fetchAllCollection = async (request) => {
    return await collectionRepository.fetchAllCollection(request);
}

const fetchReceiptNo = async (request) => {
    return await collectionRepository.fetchReceiptNo(request);
}

const fetchVoucherNo = async (request) => {
    return await collectionRepository.fetchVoucherNo(request);
}

const insertCollection = async (request) => {
    return await collectionRepository.insertCollection(request);
}

const updateCollection = async (request) => {
    return await collectionRepository.updateCollection(request);
}

const fetchEntryNo = async (request) => {
    return await collectionRepository.fetchEntryNo(request);
}

const viewSupply = async (request) => {
    const date = new Date(request.date);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const isValid = await collectionRepository.viewSupply(request, month, year);
    if (!isEmptyObject(isValid[0])) {
        return isValid;
    }
    throw formatErrorResponse("Please the Process Date then try again.", 500)
}

const processSupply = async (request) => {
    const date = new Date(request.date);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return await collectionRepository.processSupply(request, month, year);
}



module.exports = {
    fetchAllCollection,
    fetchReceiptNo,
    fetchVoucherNo,
    insertCollection,
    updateCollection,
    fetchEntryNo,
    viewSupply,
    processSupply
}