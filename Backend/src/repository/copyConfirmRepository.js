const { where } = require('sequelize');
const sequelize = require('../../sequelize')
const { getCurrentTimestamp } = require('../helper/util')
const { copyConfirmModal } = require('../models')

const fetchAllCopyConfirm = async () => {
  const copyConfirmRecords = await copyConfirmModal.findAll({
    where: { magId: 1 },
    attributes: ['sno', 'partyCode', 'magId', 'commId', 'closed', 'copies', 'updated'],
    raw: true,
    order: [
      ['partyCode', 'ASC']
    ],
  });
  const recordsWithId = copyConfirmRecords.map(record => ({
    ...record,
    id: record.sno
  }));
  return recordsWithId;
}

const fetchCopyConfirmById = async (id) => (await copyConfirmModal.findOne({
  where: { partyCode: id },
  attributes: {
    exclude: ['id']
  },
  order: [['partyCode', 'ASC']]
}));


const updateCopyConfirm = async (requestData) => {
  const query = `
            UPDATE copyconfirm
            SET partyCode = :partyCode,
                magId = :magId,
                commId = :commId,
                copies = :copies,
                updated = :updated
            WHERE sno = :sno;
        `;

  return await sequelize.query(query, {
    replacements: {
      partyCode: requestData.partyCode,
      magId: requestData.magId,
      commId: requestData.commId,
      copies: requestData.copies,
      updated: getCurrentTimestamp(),
      sno: requestData.sno
    },
    type: sequelize.QueryTypes.UPDATE
  });
}

const createCopyConfirm = async (requestData) => (await sequelize.query(`
            INSERT INTO copyconfirm (partyCode, magId, commId, copies, updated)
            VALUES (:partyCode,:magId, :commId, :copies, :updated);`, {
  replacements: {
    partyCode: requestData.partyCode.toUpperCase(),
    magId: requestData.magId,
    commId: requestData.commId,
    copies: requestData.copies,
    updated: getCurrentTimestamp()
  },
  type: sequelize.QueryTypes.INSERT
}))

module.exports = {
  fetchAllCopyConfirm,
  updateCopyConfirm,
  createCopyConfirm,
  fetchCopyConfirmById
}