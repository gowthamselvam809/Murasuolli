const sequelize = require('../../sequelize')
const { getCurrentTimestamp } = require('../helper/util')
const { districtModal } = require('../models')

const fetchAllDistrict = async () => (await districtModal.findAll({
  attributes: {
    exclude: ['id']
  },
  order: [['areaName', 'ASC']]
}))

const fetchDistrictById = async (id) => (await districtModal.findAll({
  where: { areaCode: id },
  attributes: {
    exclude: ['id']
  },
  order: [['areaCode', 'ASC']]
}))


const updateDistrict = async (requestData) => (await sequelize.query(`
            UPDATE districtmaster
            SET areaName = :areaName,
                areaSht = :areaSht,
                stCode = :stCode,
                updated = :updated
            WHERE areaCode = :areaCode
        `, {
  replacements: {
    areaCode: requestData.areaCode.toUpperCase(),
    areaName: requestData.areaName.toUpperCase(),
    areaSht: requestData.areaSht.toUpperCase(),
    stCode: requestData.stCode.toUpperCase(),
    updated: getCurrentTimestamp()
  },
  type: sequelize.QueryTypes.UPDATE,
  logging: console.log
}))


const createDistrict = async (requestData) => (await sequelize.query(`
     INSERT INTO districtmaster (areaCode, areaName, stCode,areaSht, updated)
            VALUES (:areaCode, :areaName, :stCode, :areaSht, :updated)
`, {
  replacements: {
    areaCode: requestData.areaCode.toUpperCase(),
    areaName: requestData.areaName.toUpperCase(),
    areaSht: requestData.areaSht.toUpperCase(),
    stCode: requestData.stCode.toUpperCase(),
    updated: getCurrentTimestamp()
  },
  type: sequelize.QueryTypes.INSERT,
  logging: console.log
}))


module.exports = {
  fetchAllDistrict,
  fetchDistrictById,
  createDistrict,
  updateDistrict
}
