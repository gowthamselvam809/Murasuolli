const sequelize = require('../../dynamicSequelize')
const { getCurrentTimestamp } = require('../helper/util')
const { reasonModal } = require('../models')

const fetchAllReason = async (requestData) => (await reasonModal(requestData.dbName).findAll({
  attributes: {
    exclude: ['id']
  }
}))

const fetchReasonById = async (id) => (await reasonModal(requestData.dbName).findOne({
  where: { reasonId: id },
  attributes: {
    exclude: ['id']
  },
  order: [['reasonId', 'ASC']]
}));


const updateReason = async (requestData) => (await sequelize(requestData.dbName).query(`
            UPDATE reason
            SET reasonName = :reasonName,
                depositTrf = :depositTrf,
                updated = :updated
            WHERE reasonId = :reasonId
        `, {
  replacements: {
    reasonId: requestData.reasonId,
    reasonName: requestData.reasonName,
    depositTrf: requestData.depositTrf,
    updated: getCurrentTimestamp()
  },
  type: sequelize.QueryTypes.UPDATE,
  logging: console.log
}))

const createReason = async (requestData) => (await sequelize(requestData.dbName).query(`
     INSERT INTO reason (reasonName, reasonId, depositTrf, updated)
            VALUES (:reasonName, :reasonId, :depositTrf, :updated)
`, {
  replacements: {
    reasonId: requestData.reasonId,
    reasonName: requestData.reasonName,
    depositTrf: requestData.depositTrf,
    updated: getCurrentTimestamp()
  },
  type: sequelize.QueryTypes.INSERT,
  logging: console.log
}))

const fetchReasonForDropdown = async (requestData) => (await sequelize(requestData.dbName).query(`SELECT reasonId as value, reasonName as label from reason`))


module.exports = {
  fetchAllReason,
  updateReason,
  createReason,
  fetchReasonById,
  fetchReasonForDropdown
}