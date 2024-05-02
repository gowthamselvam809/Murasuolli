const { districtService } = require("../services");

const { util: { formatResponse } } = require('../helper');


const fetchAllDistrict = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await districtService.fetchAllDistrict(request);
        res.send(formatResponse(result));
    } catch (error) {
        next(error);
    }
};

const createDistrict = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await districtService.createDistrict(request);
        res.send(formatResponse(result));
    } catch (error) {
        next(error);
    }
};

const updateDistrict = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await districtService.updateDistrict(request);
        res.send(formatResponse(result));
    } catch (error) {
        next(error);
    }
};

module.exports = {
    fetchAllDistrict,
    updateDistrict,
    createDistrict
}