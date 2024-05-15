const { companyService } = require("../services");

const { util: { formatResponse } } = require('../helper');


const fetchAllCompanies = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await companyService.fetchAllCompanies(request);
        res.send(formatResponse(result));
    } catch (error) {
        next(error);
    }
};


module.exports = {
    fetchAllCompanies,

}