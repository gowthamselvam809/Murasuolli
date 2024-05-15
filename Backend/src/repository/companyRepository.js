const sequelize = require('../../dynamicSequelize')('AdventureWorks2022');
const { getCurrentTimestamp } = require('../helper/util')
const { companyModal } = require('../models')


const fetchAllCompanies = async () => (await companyModal.findAll({
  attributes: ['compCode', 'compName', 'address1', 'address2', 'city', 'pinCode'],
  raw: true,
}));


module.exports = {
  fetchAllCompanies
}