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
const fetchEntryNo = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await collectionService.fetchEntryNo(request);
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
    fetchEntryNo
}