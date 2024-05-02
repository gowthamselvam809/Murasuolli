const sequelize = require('../../sequelize')
const { getCurrentTimestamp } = require('../helper/util')
const { magazineModal } = require('../models')

const fetchAllMagazine = async () => (await magazineModal.findAll({
  attributes: {
    exclude: ['id']
  }
}))

const fetchMagazineById = async (id) => (await magazineModal.findOne({
  where: { magId: id },
  attributes: {
    exclude: ['id']
  },
  order: [['magId', 'ASC']]
}));


const createMagazine = async (requestData) => (await sequelize.query(
  `INSERT INTO magazine(magId, magName, magShort, saleRate, unSoldRate, unSoldPer, magIssDay, magIssMode, updated)
            VALUES(:magId, :magName, :magShort, :saleRate, :unSoldRate, :unSoldPer,:magIssDay, :magIssMode, :updated)`, {
  replacements: {
    magId: parseInt(requestData.magId),
    magName: requestData.magName.toUpperCase(),
    magShort: requestData.magShort.toUpperCase(),
    saleRate: parseFloat(requestData.saleRate),
    unSoldRate: parseFloat(requestData.unSoldRate),
    unSoldPer: parseFloat(requestData.unSoldPer),
    upTime: requestData.upTime,
    magIssDay: requestData.magIssDay.toUpperCase(),
    magIssMode: requestData.magIssMode.toUpperCase(),
    updated: getCurrentTimestamp()
  }, type: sequelize.QueryTypes.INSERT
}))

const updateMagazine = async (requestData) => (await sequelize.query(`
UPDATE magazine
    SET magName = :magName,
        magShort = :magShort,
        unSoldRate = :unSoldRate,
        unSoldPer = :unSoldPer,
        saleRate = :saleRate,
        magIssMode = :magIssMode,
        magIssDay = :magIssDay,
        updated = :updated
    WHERE magId = :magId`, {
  replacements: {
    magName: requestData.magName,
    magShort: requestData.magShort,
    unSoldRate: parseFloat(requestData.unSoldRate),
    unSoldPer: parseFloat(requestData.unSoldPer),
    saleRate: parseFloat(requestData.saleRate),
    magIssMode: requestData.magIssMode,
    magIssDay: requestData.magIssDay,
    updated: getCurrentTimestamp(),
    magId: parseInt(requestData.magId)
  }, type: sequelize.QueryTypes.UPDATE
}))



module.exports = {
  fetchAllMagazine,
  updateMagazine,
  createMagazine,
  fetchMagazineById
}