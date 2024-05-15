const sequelize = require('../../dynamicSequelize');
const { getCurrentTimestamp } = require('../helper/util')
const { operatorModal } = require('../models')


const fetchAllOperator = async (requestData) => {
  return await operatorModal(requestData.dbName).findAll({
    attributes: {
      exclude: ['id']
    },
    raw: true,
  })
};

const fetchOperatorById = async (requestData) => {
  return await operatorModal(requestData.dbName).findOne({
    where: { MOpe_Code: requestData.operator },
    attributes: {
      exclude: ['id']
    },
    raw: true,
    order: [['MOpe_Code', 'ASC']]
  })
}


module.exports = {
  fetchAllOperator,
  fetchOperatorById
}