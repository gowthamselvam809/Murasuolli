const { stateService } = require("../services");

const { util: { formatResponse } } = require('../helper');


const fetchAllState = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await stateService.fetchAllState(request);
        console.log(result)
        res.send(formatResponse(result));
    } catch (error) {
        next(error);
    }
};

module.exports = {
    fetchAllState
}