const { financialYearRepository } = require('../repository');
const { isEmptyArray, formatErrorResponse, isEmptyObject } = require('../helper/util');


const fetchAllFinancialYear = async (request) => {
    const finance = await financialYearRepository.fetchAllFinancialYear(request);
    return finance.map((comp) => ({ label: `${comp.periodFrom.toISOString().split('T')[0]} - ${comp.periodTo.toISOString().split('T')[0]}`, value: comp.transFile }));
}

module.exports = {
    fetchAllFinancialYear,
}