const { reasonService } = require("../services");

const { util: { formatResponse } } = require('../helper');


const fetchAllReason = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await reasonService.fetchAllReason(request);
        res.send(formatResponse(result));
    } catch (error) {
        next(error);
    }
};

const updateReason = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await reasonService.updateReason(request);
        res.send(formatResponse(result));
    } catch (error) {
        next(error);
    }
};

const createReason = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await reasonService.createReason(request);
        res.send(formatResponse(result));
    } catch (error) {
        next(error);
    }
};

module.exports = {
    fetchAllReason,
    updateReason,
    createReason
}