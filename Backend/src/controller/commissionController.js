const { commissionService } = require("../services");

const { util: { formatResponse } } = require('../helper');


const fetchAllCommission = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await commissionService.fetchAllCommission(request);
        res.send(formatResponse(result));
    } catch (error) {
        next(error);
    }
};

const updateCommission = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await commissionService.updateCommission(request);
        res.send(formatResponse(result));
    } catch (error) {
        next(error);
    }
};

const createCommission = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await commissionService.createCommission(request);
        res.send(formatResponse(result));
    } catch (error) {
        next(error);
    }
};

module.exports = {
    fetchAllCommission,
    createCommission,
    updateCommission
}