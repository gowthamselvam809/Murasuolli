const { magazineService } = require("../services");

const { util: { formatResponse } } = require('../helper');


const fetchAllMagazine = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await magazineService.fetchAllMagazine(request);
        res.send(formatResponse(result));
    } catch (error) {
        next(error);
    }
};

const updateMagazine = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await magazineService.updateMagazine(request);
        res.send(formatResponse(result));
    } catch (error) {
        next(error);
    }
};

const createMagazine = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await magazineService.createMagazine(request);
        res.send(formatResponse(result));
    } catch (error) {
        next(error);
    }
};

module.exports = {
    fetchAllMagazine,
    updateMagazine,
    createMagazine
}