const { isEmptyObject, formatErrorResponse } = require('../helper/util');
const { collectionRepository } = require('../repository');


const fetchAllCollection = async (request) => {
    return await collectionRepository.fetchAllCollection(request);
}

const getChallanCounterNo = async (request) => {
    return await collectionRepository.getChallanCounterNo(request);
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

const updateCreditDebitCollection = async (request) => {
    return await collectionRepository.updateCreditDebitCollection(request);
}

const insertCreditDebitCollection = async (request) => {
    return await collectionRepository.insertCreditDebitCollection(request);
}

const fetchReports = async (request) => {
    return await collectionRepository.fetchReports(request);
}

const deleteCreditDebitCollection = async (request) => {
    return await collectionRepository.deleteCreditDebitCollection(request);
}

const deleteCollection = async (request) => {
    return await collectionRepository.deleteCollection(request);
}

const fetchReportsForPrint = async (request) => {
    return await collectionRepository.fetchReportsForPrint(request);
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
    updateCreditDebitCollection,
    insertCreditDebitCollection,
    deleteCreditDebitCollection,
    fetchEntryNo,
    viewSupply,
    processSupply,
    deleteCollection,
    fetchReports,
    getChallanCounterNo,
    fetchReportsForPrint
}