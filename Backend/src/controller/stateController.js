const { stateService } = require("../services");

const { util: { formatResponse } } = require('../helper');


const fetchAllState = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await stateService.fetchAllState(request);
        res.send(formatResponse(result));
    } catch (error) {
        next(error);
    }
};

const createState = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await stateService.createState(request);
        res.send(formatResponse(result));
    } catch (error) {
        next(error);
    }
};

const updateState = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await stateService.updateState(request);
        res.send(formatResponse(result));
    } catch (error) {
        next(error);
    }
};

module.exports = {
    fetchAllState,
    createState,
    updateState
}