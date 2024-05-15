const { financialYearService } = require("../services");

const { util: { formatResponse } } = require('../helper');


const fetchAllFinancialYear = async (req, res, next) => {
    try {
        let request = { ...req.body, dbName: req.headers.database }
        console.log(request)
        let result = await financialYearService.fetchAllFinancialYear(request);
        res.send(formatResponse(result));
    } catch (error) {
        next(error);
    }
};


module.exports = {
    fetchAllFinancialYear,
}