const { copyConfirmService } = require("../services");

const { util: { formatResponse } } = require('../helper');


const fetchAllCopyConfirm = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await copyConfirmService.fetchAllCopyConfirm(request);
        res.send(formatResponse(result));
    } catch (error) {
        next(error);
    }
};

const updateCopyConfirm = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await copyConfirmService.updateCopyConfirm(request);
        res.send(formatResponse(result));
    } catch (error) {
        next(error);
    }
};

const createCopyConfirm = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await copyConfirmService.createCopyConfirm(request);
        res.send(formatResponse(result));
    } catch (error) {
        next(error);
    }
};

module.exports = {
    fetchAllCopyConfirm,
    createCopyConfirm,
    updateCopyConfirm
}