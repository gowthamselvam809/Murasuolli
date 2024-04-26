const { headAccService } = require("../services");

const { util: { formatResponse } } = require('../helper');

const fetchUser = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await headAccService.fetchUser(request);
        console.log(result)
        res.send(formatResponse(result));
    } catch (error) {
        next(error);
    }
};

const fetchAllUser = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await headAccService.fetchAllUser(request);
        console.log(result)
        res.send(formatResponse(result));
    } catch (error) {
        next(error);
    }
};

module.exports = {
    fetchUser,
    fetchAllUser
}