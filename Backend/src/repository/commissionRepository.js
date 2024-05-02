const sequelize = require('../../sequelize')
const { getCurrentTimestamp } = require('../helper/util')
const { commissionModal } = require('../models')


const fetchCommissionById = async (id) => (await commissionModal.findOne({
  where: { commId: id },
  attributes: {
    exclude: ['id']
  },
  order: [['commId', 'ASC']]
}));


const fetchAllCommission = async () => {
  const commissionRecords = await commissionModal.findAll({
    attributes: ['commId', 'commName', 'magId', 'commShort', 'commPer', 'updated'],
    raw: true,
  });

  const recordsWithId = commissionRecords.map((record, index) => ({
    ...record,
    id: index + 1
  }));
  return recordsWithId;
}

const updateCommission = async (requestData) => {
  const query = `
            UPDATE commcatg
            SET commPer = :commPer,
                magId = :magId,
                commName = :commName,
                commShort = :commShort,
                updated = :updated
            WHERE commId = :commId;
        `;

  return await sequelize.query(query, {
    replacements: {
      commName: requestData.commName.toUpperCase(),
      magId: requestData.magId,
      commPer: requestData.commPer,
      commId: requestData.commId,
      commShort: requestData.commShort.toUpperCase(),
      updated: getCurrentTimestamp(),
    },
    type: sequelize.QueryTypes.UPDATE
  });
}

const createCommission = async (requestData) => (await sequelize.query(`
            INSERT INTO commcatg (commId, magId, commName, commShort,commPer, updated)
            VALUES (:commId,:magId, :commName, :commShort,:commPer, :updated);`, {
  replacements: {
    commName: requestData.commName.toUpperCase(),
    magId: requestData.magId,
    commPer: requestData.commPer,
    commId: requestData.commId,
    commShort: requestData.commShort.toUpperCase(),
    updated: getCurrentTimestamp()
  },
  type: sequelize.QueryTypes.INSERT
}))

module.exports = {
  fetchAllCommission,
  fetchCommissionById,
  createCommission,
  updateCommission,
}