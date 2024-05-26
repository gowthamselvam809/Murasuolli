const { headAccService } = require("../services");

const { util: { formatResponse } } = require('../helper');

const fetchUser = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await headAccService.fetchUser(request);
        res.send(formatResponse(result));
    } catch (error) {
        next(error);
    }
};

const fetchAllUser = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await headAccService.fetchAllUser(request);
        res.send(formatResponse(result));
    } catch (error) {
        next(error);
    }
};

const addAgent = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await headAccService.addAgent(request);
        res.send(formatResponse(result));
    } catch (error) {
        next(error);
    }
};

const updateAgent = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await headAccService.updateAgent(request);
        res.send(formatResponse(result));
    } catch (error) {
        next(error);
    }
};

const deleteAgent = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await headAccService.deleteAgent(request);
        res.send(formatResponse(result));
    } catch (error) {
        next(error);
    }
};

const fetchAllBankType = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await headAccService.fetchAllBankType(request);
        res.send(formatResponse(result));
    } catch (error) {
        next(error);
    }
};

const fetchAgentForDropdown = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await headAccService.fetchAgentForDropdown(request);
        res.send(formatResponse(result));
    } catch (error) {
        next(error);
    }
};

const fetchBankForDropdown = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await headAccService.fetchBankForDropdown(request);
        res.send(formatResponse(result));
    } catch (error) {
        next(error);
    }
};

module.exports = {
    fetchUser,
    fetchAllUser,
    addAgent,
    updateAgent,
    deleteAgent,
    fetchAllBankType,
    fetchAgentForDropdown,
    fetchBankForDropdown
}