const sequelize = require('../../sequelize');
const { getCurrentTimestamp } = require('../helper/util');
const { stateModal } = require('../models')

const fetchStateById = async (id) => (await stateModal.findOne({
  where: { stateCode: id },
  attributes: {
    exclude: ['id']
  },
  order: [['stateCode', 'ASC']]
}));

const fetchAllState = async () => (await stateModal.findAll({
  attributes: {
    exclude: ['id']
  }
}))


const updateState = async (requestData) => (await sequelize.query(`
            UPDATE statemaster
            SET stateName = :stateName,
                country = :country,
                updated = :updated
            WHERE stateCode = :stateCode
        `, {
  replacements: {
    stateCode: requestData.stateCode,
    country: requestData.country.toUpperCase(),
    stateName: requestData.stateName.toUpperCase(),
    updated: getCurrentTimestamp()
  },
  type: sequelize.QueryTypes.UPDATE,
  logging: console.log
}))


const createState = async (requestData) => (await sequelize.query(`
     INSERT INTO statemaster (stateCode, country, stateName, updated)
            VALUES (:stateCode, :country, :stateName, :updated)
`, {
  replacements: {
    stateCode: requestData.stateCode,
    country: requestData.country.toUpperCase(),
    stateName: requestData.stateName.toUpperCase(),
    updated: getCurrentTimestamp()
  },
  type: sequelize.QueryTypes.INSERT,
  logging: console.log
}))


module.exports = {
  fetchStateById,
  fetchAllState,
  createState,
  updateState
}