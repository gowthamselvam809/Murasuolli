const { companyRepository } = require('../repository');
const { isEmptyArray, formatErrorResponse, isEmptyObject } = require('../helper/util');


const fetchAllCompanies = async (request) => {
    const company = await companyRepository.fetchAllCompanies();
    return company.map((comp) => ({ label: comp.compName, value: comp.compCode }));
}

module.exports = {
    fetchAllCompanies,

}