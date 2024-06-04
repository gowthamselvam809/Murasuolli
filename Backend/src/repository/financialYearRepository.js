// const sequelize = require('../../dynamicSequelize')('MZCompany');
const { getCurrentTimestamp } = require('../helper/util')
const { financialYearModal } = require('../models')


const fetchAllFinancialYear = async (requestData) => {
  console.log(requestData.dbName)
  return await financialYearModal(requestData.dbName).findAll({
    attributes: ['transFile', 'periodTo', 'periodFrom', 'compCode'],
    raw: true,
  })
};


module.exports = {
  fetchAllFinancialYear
}