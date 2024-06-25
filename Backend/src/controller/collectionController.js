const { collectionService } = require("../services");

const { util: { formatResponse } } = require('../helper');


const fetchAllCollection = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await collectionService.fetchAllCollection(request);
        res.send(formatResponse(result));
    } catch (error) {
        next(error);
    }
};

const fetchReceiptNo = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await collectionService.fetchReceiptNo(request);
        res.send(formatResponse(result));
    } catch (error) {
        next(error);
    }
};

const fetchVoucherNo = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await collectionService.fetchVoucherNo(request);
        res.send(formatResponse(result));
    } catch (error) {
        next(error);
    }
};

const insertCollection = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await collectionService.insertCollection(request);
        res.send(formatResponse(result));
    } catch (error) {
        next(error);
    }
};

const updateCollection = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await collectionService.updateCollection(request);
        res.send(formatResponse(result));
    } catch (error) {
        next(error);
    }
};

const updateCreditDebitCollection = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await collectionService.updateCreditDebitCollection(request);
        res.send(formatResponse(result));
    } catch (error) {
        next(error);
    }
};

const deleteCreditDebitCollection = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await collectionService.deleteCreditDebitCollection(request);
        res.send(formatResponse(result));
    } catch (error) {
        next(error);
    }
};

const fetchEntryNo = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await collectionService.fetchEntryNo(request);
        res.send(formatResponse(result));
    } catch (error) {
        next(error);
    }
};

const processSupply = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await collectionService.processSupply(request);
        res.send(formatResponse(result));
    } catch (error) {
        next(error);
    }
};

const viewSupply = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await collectionService.viewSupply(request);
        res.send(formatResponse(result));
    } catch (error) {
        next(error);
    }
};

const insertCreditDebitCollection = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await collectionService.insertCreditDebitCollection(request);
        res.send(formatResponse(result));
    } catch (error) {
        next(error);
    }
};

const deleteCollection = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await collectionService.deleteCollection(request);
        res.send(formatResponse(result));
    } catch (error) {
        next(error);
    }
};
const fetchReports = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await collectionService.fetchReports(request);
        res.send(formatResponse(result));
    } catch (error) {
        next(error);
    }
};

const getChallanCounterNo = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await collectionService.getChallanCounterNo(request);
        res.send(formatResponse(result));
    } catch (error) {
        next(error);
    }
};

const fetchReportsForPrint = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await collectionService.fetchReportsForPrint(request);
        res.send(formatResponse(result));
    } catch (error) {
        next(error);
    }
};

module.exports = {
    fetchAllCollection,
    fetchReceiptNo,
    fetchVoucherNo,
    insertCollection,
    updateCollection,
    fetchEntryNo,
    processSupply,
    viewSupply,
    updateCreditDebitCollection,
    deleteCreditDebitCollection,
    insertCreditDebitCollection,
    deleteCollection,
    fetchReports,
    getChallanCounterNo,
    fetchReportsForPrint
}