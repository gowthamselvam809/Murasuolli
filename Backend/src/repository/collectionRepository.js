const sequelize = require('../../dynamicSequelize');
const { getCurrentTimestamp } = require('../helper/util')
const { collectionModal } = require('../models')


const fetchAllCollection = async (requestData) => {
  const results = await collectionModal(requestData.financial).findAll({
    attributes: ['partyCode', 'docNo', 'voucherNo', 'contraCode', 'docDate', 'dues', 'deposit', 'upTime', 'bankDet', 'reason', 'amount'],
    where: { tranType: requestData.tranType },
    raw: true,
  });

  return results.map((item, index) => ({
    ...item,
    id: index + 1
  }));
};

const fetchReceiptNo = async (requestData) => {
  return await sequelize(requestData.financial).query(`
      select max(docno) as receiptNo from Collection where partycode = '${requestData.partyCode}' and Contracode = 'cash'
  `)
}

const fetchVoucherNo = async (requestData) => {
  return await sequelize(requestData.financial).query(`
    select max(voucherno) as voucherNo from Collection where Contracode = 'cash'
  `)
}
const fetchEntryNo = async (requestData) => {
  return await sequelize(requestData.financial).query(`
    select max(voucherNo) as voucherNo from Collection where tranType = '${requestData.tranType}'
  `)
}
const insertCollection = async (requestData) => {
  const dynamicSequelize = sequelize(requestData.financial);
  await dynamicSequelize.query(`
        INSERT INTO collection (partyCode, docNo, voucherNo, contraCode, updated, docDate,reason , dues, deposit, tranType, bankDet)
        VALUES (:partyCode, :docNo, :voucherNo, :contraCode, :updated, :docDate,:reason,  :dues, :deposit, :tranType, :bankDet)
    `, {
    replacements: {
      partyCode: requestData.partyCode ? requestData.partyCode.toUpperCase() : null,
      docNo: requestData.docNo,
      voucherNo: requestData.voucherNo,
      contraCode: requestData.contraCode,
      updated: getCurrentTimestamp(),
      docDate: requestData.docDate ? requestData.docDate.toUpperCase() : null,
      dues: requestData.dues,
      deposit: requestData.deposit,
      reason: requestData.reason,
      tranType: requestData.tranType ? requestData.tranType.toUpperCase() : null,
      bankDet: requestData.bankDet ? requestData.bankDet.toUpperCase() : null
    },
    type: dynamicSequelize.QueryTypes.INSERT
  });
};

const updateCollection = async (requestData) => {
  const dynamicSequelize = sequelize(requestData.financial);
  await dynamicSequelize.query(`
        UPDATE collection
        SET
            partyCode = :partyCode,
            docNo = :docNo,
            voucherNo = :voucherNo,
            contraCode = :contraCode,
            updated = :updated,
            docDate = :docDate,
            reason = :reason,
            dues = :dues,
            deposit = :deposit,
            tranType = :tranType,
            bankDet = :bankDet
        WHERE
            docNo = :docNo AND partyCode = :partyCode AND voucherNo = :voucherNo
    `, {
    replacements: {
      partyCode: requestData.partyCode ? requestData.partyCode.toUpperCase() : null,
      docNo: requestData.docNo,
      voucherNo: requestData.voucherNo,
      contraCode: requestData.contraCode,
      updated: getCurrentTimestamp(),
      docDate: requestData.docDate ? requestData.docDate.toUpperCase() : null,
      reason: requestData.reason,
      dues: requestData.dues,
      deposit: requestData.deposit,
      tranType: 'RC',
      bankDet: requestData.bankDet ? requestData.bankDet.toUpperCase() : null,
    },
    type: dynamicSequelize.QueryTypes.UPDATE
  });
};

module.exports = {
  fetchAllCollection,
  fetchReceiptNo,
  fetchVoucherNo,
  insertCollection,
  updateCollection,
  fetchEntryNo
}