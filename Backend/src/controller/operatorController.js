const { operatorService } = require("../services");

const { util: { formatResponse } } = require('../helper');


const fetchAllOperator = async (req, res, next) => {
    try {
        let request = { ...req.body, dbName: req.headers.database }
        let result = await operatorService.fetchAllOperator(request);
        res.send(formatResponse(result));
    } catch (error) {
        next(error);
    }
};

const userLogin = async (req, res, next) => {
    try {
        let request = { ...req.body, dbName: req.headers.database }
        let result = await operatorService.userLogin(request);
        res.send(formatResponse(result));
    } catch (error) {
        next(error);
    }
};


module.exports = {
    fetchAllOperator,
    userLogin
}