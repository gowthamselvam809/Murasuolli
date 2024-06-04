const sequelize = require('../../dynamicSequelize');
const { getCurrentTimestamp, insertBillFunc, ensureBulkInsertBillProcedureExists, formatDateWithShortMonthDayAndYear } = require('../helper/util')
const { collectionModal } = require('../models')


const fetchAllCollection = async (requestData) => {
  const results = await collectionModal(requestData.financial).findAll({
    attributes: ['partyCode', 'docNo', 'voucherNo', 'contraCode', 'docDate', 'dues', 'deposit', 'upTime', 'bankDet', 'reason', 'amount', 'remark1'],
    where: { tranType: requestData.tranType },
    raw: true,
    order: [['docDate', 'DESC']]
  });

  return results.map((item, index) => ({
    ...item,
    id: index + 1,
    date: formatDateWithShortMonthDayAndYear(item.docDate)
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

const insertCreditDebitCollection = async (requestData) => {
  const dynamicSequelize = sequelize(requestData.financial);
  await dynamicSequelize.query(`
        INSERT INTO collection (partyCode, docNo, updated, docDate, reason,remark1, amount,dues,deposit, tranType)
        VALUES (:partyCode, :docNo, :updated, :docDate,:reason, :remark1, :amount,:amount, :amount,  :tranType)
    `, {
    replacements: {
      partyCode: requestData.partyCode ? requestData.partyCode.toUpperCase() : null,
      docNo: requestData.docNo,
      updated: getCurrentTimestamp(),
      docDate: requestData.docDate ? requestData.docDate.toUpperCase() : null,
      reason: requestData.reason,
      remark1: requestData.remark1,
      amount: requestData.amount,
      tranType: requestData.tranType ? requestData.tranType.toUpperCase() : null,
    },
    type: dynamicSequelize.QueryTypes.INSERT
  });
};

const updateCollection = async (requestData) => {
  const dynamicSequelize = sequelize(requestData.financial);
  console.log(requestData.dues)
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

const updateCreditDebitCollection = async (requestData) => {
  const dynamicSequelize = sequelize(requestData.financial);
  await dynamicSequelize.query(`
        UPDATE collection
        SET
            updated = :updated,
            docDate = :docDate,
            reason = :reason,
            amount = :amount,
            bankDet = :bankDet,
            reason = :reason,
            remark1 = :remark1
        WHERE
            docNo = :docNo AND partyCode = :partyCode AND transType = :transType
    `, {
    replacements: {
      partyCode: requestData.partyCode ? requestData.partyCode.toUpperCase() : null,
      updated: getCurrentTimestamp(),
      docDate: requestData.docDate ? requestData.docDate.toUpperCase() : null,
      reason: requestData.reason,
      remark1: requestData.remark1,
      amount: requestData.amount,
      tranType: requestData.tranType,
    },
    type: dynamicSequelize.QueryTypes.UPDATE
  });
};

const processSupply = async (requestData, month, year) => {
  const dynamicSequelize = sequelize(requestData.financial);
  await ensureBulkInsertBillProcedureExists(dynamicSequelize, requestData.financial);
  return dynamicSequelize.query(`exec dbo.BulkInsertBill '${requestData.date}' , '${month}','${year}'`)
}

const viewSupply = async (requestData, month, year) => {
  const dynamicSequelize = sequelize(requestData.financial);
  return dynamicSequelize.query(`
    SELECT * from (select partycode,'D'+RIGHT('00' + CAST(DATEPART(dd, ISSDATE) AS varchar(2)), 2) as dayx,isnull(copies,0) as copies FROM ISSUES  
    where year(issdate)=${year} and month(issdate)=${month}) as a inner join (select PARTYCODE as psumm,sum(copies*rate) as dues, sum((copies*rate)*(commission/100)) as comsn, 
     ROW_NUMBER() OVER (ORDER BY partycode) AS id from issues
      where year(issdate)=${year} and month(issdate)=${month} group by PARTYCODE) as b on a.PARTYCODE=b.psumm                    
    pivot
    (sum(a.copies) for dayx in ( D01,D02,D03,D04,D05,D06,D07,D08,D09,D10,D11,
    D12,D13,D14,D15,D16,D17,D18,D19,D20,D21,D22,D23,D24,D25,D26,D27,D28,D29,D30,D31
    )) as pt
    `)
}

module.exports = {
  fetchAllCollection,
  fetchReceiptNo,
  fetchVoucherNo,
  insertCollection,
  updateCollection,
  fetchEntryNo,
  processSupply,
  viewSupply,
  updateCreditDebitCollection,
  insertCreditDebitCollection
}