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



module.exports = {
    fetchAllCollection,
    fetchReceiptNo,
    fetchVoucherNo,
    insertCollection,
    updateCollection,
    fetchEntryNo
}