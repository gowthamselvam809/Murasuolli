const { Sequelize } = require('sequelize');
const sequelize = require('../../dynamicSequelize');
const initialSequelize = require('../../sequelize');

const { getCurrentTimestamp, insertBillFunc, ensureBulkInsertBillProcedureExists, formatDateWithShortMonthDayAndYear } = require('../helper/util')
const { collectionModal } = require('../models')


const fetchAllCollection = async (requestData) => {
  const collectionSequelize = sequelize(requestData.financial);
  const headaccSequelize = sequelize(requestData.dbName);

  // Step 1: Fetch all collections
  const collectionResults = await collectionSequelize.query(`
        SELECT 
            partyCode, 
            docNo, 
            voucherNo, 
            contraCode, 
            docDate, 
            dues, 
            deposit, 
            upTime, 
            bankDet,
            reason, 
            amount, 
            remark1,
            ttran,
            chqmode,
            chqdate,
             chqno,
             remark2
        FROM collection
        WHERE tranType = :tranType
        ORDER BY docDate DESC
    `, {
    replacements: { tranType: requestData.tranType },
    type: Sequelize.QueryTypes.SELECT
  });

  // Step 2: Extract unique partyCode values
  const uniquePartyCodes = [...new Set(collectionResults.map(item => item.partyCode))];

  // Step 3: Fetch headacc details for each unique partyCode
  const headaccResults = await headaccSequelize.query(`
        SELECT 
            heada_code AS partyCode, 
            heada_name AS name, 
            place 
        FROM headacc
        WHERE heada_code IN (:partyCodes)
    `, {
    replacements: { partyCodes: uniquePartyCodes },
    type: Sequelize.QueryTypes.SELECT
  });

  // Step 4: Create a map for quick lookup of concatenated party code details
  const partyCodeDetailsMap = headaccResults.reduce((acc, detail) => {
    acc[detail.partyCode] = `${detail.partyCode} - ${detail.name} - ${detail.place}`;
    return acc;
  }, {});

  // Step 5: Map the fetched details to the original results and replace partyCode
  return collectionResults.map((item, index) => ({
    ...item,
    id: index + 1,
    date: formatDateWithShortMonthDayAndYear(item.docDate),
    partyCode: partyCodeDetailsMap[item.partyCode] || item.partyCode
  }));
};

const fetchReceiptNo = async (requestData) => {
  return await sequelize(requestData.financial).query(`
      select max(docno) as receiptNo from Collection where partycode = '${requestData.partyCode}' and Contracode = 'cash'
  `)
}

const fetchVoucherNo = async (requestData) => {
  return await sequelize(requestData.financial).query(`
   select max(docno) as no from Collection where trantype='rc' 
  `)
}
const fetchEntryNo = async (requestData) => {
  return await sequelize(requestData.financial).query(`
    select max(voucherNo) as voucherNo from Collection where tranType = '${requestData.tranType}'
  `)
}

const insertCollection = async (requestData) => {
  const dynamicSequelize = sequelize(requestData.financial);
  console.log("ttran-------------------", requestData.ttran)

  return await dynamicSequelize.query(`
        INSERT INTO collection (partyCode, docNo, voucherNo, contraCode, updated, docDate,reason , dues, deposit, tranType, bankDet,chqno ,chqdate, chqmode, remark2, ttran )
        VALUES (:partyCode, :docNo, :voucherNo, :contraCode, :updated, :docDate,:reason,  :dues, :deposit, :tranType, :bankDet, :chqno ,:chqdate, :chqmode, :remark2, :ttran )
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
      chqno: requestData.chqno ? requestData.chqno.toUpperCase() : null,
      chqdate: requestData.chqdate ? requestData.chqdate.toUpperCase() : null,
      chqmode: requestData.chqmode ? requestData.chqmode.toUpperCase() : null,
      remark2: requestData.remark2 ? requestData.remark2.toUpperCase() : null,
      ttran: requestData.ttran ? requestData.ttran.toUpperCase() : null,
      bankDet: requestData.bankDet ? requestData.bankDet.toUpperCase() : null
    },
    type: dynamicSequelize.QueryTypes.INSERT
  });
};

const insertCreditDebitCollection = async (requestData) => {
  const dynamicSequelize = sequelize(requestData.financial);
  return await dynamicSequelize.query(`
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
  console.log("ttran-------------------", requestData.ttran)

  return await dynamicSequelize.query(`
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
            bankDet = :bankDet,
            chqno =:chqno,
            chqdate=:chqdate, 
            chqmode=:chqmode,
            remark2=:remark2,
            ttran=:ttran
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
      chqno: requestData.chqno ? requestData.chqno.toUpperCase() : null,
      chqdate: requestData.chqdate ? requestData.chqdate.toUpperCase() : null,
      chqmode: requestData.chqmode ? requestData.chqmode.toUpperCase() : null,
      remark2: requestData.remark2 ? requestData.remark2.toUpperCase() : null,
      ttran: requestData.ttran ? requestData.ttran.toUpperCase() : null,
      bankDet: requestData.bankDet ? requestData.bankDet.toUpperCase() : null,
    },
    type: dynamicSequelize.QueryTypes.UPDATE
  });
};

const deleteCreditDebitCollection = async (requestData) => {
  const dynamicSequelize = sequelize(requestData.financial);
  return await dynamicSequelize.query(`
        DELETE FROM collection
        WHERE
            docNo = :docNo AND partyCode = :partyCode AND tranType = :tranType
    `, {
    replacements: {
      partyCode: requestData.partyCode ? requestData.partyCode.toUpperCase() : null,
      docNo: requestData.docNo,
      tranType: requestData.tranType,
    },
    type: dynamicSequelize.QueryTypes.DELETE
  });
};

const updateCreditDebitCollection = async (requestData) => {
  const dynamicSequelize = sequelize(requestData.financial);
  return await dynamicSequelize.query(`
        UPDATE collection
        SET
            updated = :updated,
            docDate = :docDate,
            reason = :reason,
            amount = :amount,
            remark1 = :remark1
        WHERE
            docNo = :docNo AND partyCode = :partyCode AND tranType = :tranType
    `, {
    replacements: {
      partyCode: requestData.partyCode ? requestData.partyCode.toUpperCase() : null,
      updated: getCurrentTimestamp(),
      docDate: requestData.docDate ? requestData.docDate.toUpperCase() : null,
      reason: requestData.reason,
      remark1: requestData.remark1,
      docNo: requestData.docNo,
      amount: requestData.amount,
      tranType: requestData.tranType,
    },
    type: dynamicSequelize.QueryTypes.UPDATE
  });
};

const getChallanCounterNo = async (requestData) => {
  const dynamicSequelize = sequelize(requestData.financial);
  return await dynamicSequelize.query(`
    select count(*) as cnt from  (select docno,count(*) as cnt from 
    Collection where trantype='rc' group by docno) a
    `)
}



const processSupply = async (requestData, month, year) => {
  const dynamicSequelize = sequelize(requestData.financial);
  await ensureBulkInsertBillProcedureExists(dynamicSequelize, requestData.financial);
  return dynamicSequelize.query(`exec dbo.BulkInsertBill '${requestData.date}' , '${month}','${year}'`)
}

const viewSupply = async (requestData, month, year) => {
  const dynamicSequelize = sequelize(requestData.financial);
  return dynamicSequelize.query(`
     select a.id,a.Party+'-'+b.place+'-'+b.heada_name as Agent,a.Noc,a.Dues,a.Comsn,
     a.D01,a.D02,a.D03,a.D04,a.D05,a.D06,a.D07,a.D08,a.D09,a.D10,a.D11,
     a.D12,a.D13,a.D14,a.D15,a.D16,a.D17,a.D18,a.D19,a.D20,a.D21,a.D22,a.D23,a.D24,a.D25,a.D26,a.D27,a.D28,a.D29,a.D30,a.D31
from
    (SELECT * from (select partycode as party,'D'+RIGHT('00' + CAST(DATEPART(dd, ISSDATE) AS varchar(2)), 2) as dayx,isnull(copies,0) as copies FROM ISSUES  
    where year(issdate)=${year} and month(issdate)=${month}) as a inner join (select PARTYCODE as psumm,sum(copies) as noc,sum(copies*rate) as Dues, sum((copies*rate)*(commission/100)) as Comsn, 
     ROW_NUMBER() OVER (ORDER BY partycode) AS id from issues
      where year(issdate)=${year} and month(issdate)=${month} group by PARTYCODE) as b on a.PARTY=b.psumm                    
    pivot
    (sum(a.copies) for dayx in ( D01,D02,D03,D04,D05,D06,D07,D08,D09,D10,D11,
    D12,D13,D14,D15,D16,D17,D18,D19,D20,D21,D22,D23,D24,D25,D26,D27,D28,D29,D30,D31
    )) as pt) as a inner join ${requestData.dbName}.dbo.headacc as b on a.party=b.heada_code order by a.party
    `)
}

const deleteCollection = async (requestData) => {
  const dynamicSequelize = sequelize(requestData.financial);
  return await dynamicSequelize.query(`
        DELETE FROM collection
        WHERE
            docNo = :docNo AND partyCode = :partyCode AND voucherNo = :voucherNo
    `, {
    replacements: {
      partyCode: requestData.partyCode ? requestData.partyCode.toUpperCase() : null,
      docNo: requestData.docNo,
      voucherNo: requestData.voucherNo,
    },
    type: dynamicSequelize.QueryTypes.DELETE
  });
};

const fetchReports = async (requestData) => {
  try {
    const results = await initialSequelize.query(`
      SELECT 
        ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS id,
        b.place,
        b.heada_name, 
        a.partyCode,
        a.copies 
      FROM COPYCONFIRM as a  
      INNER JOIN HEADACC as b 
      ON a.PARTYCODE = b.heada_code 
      WHERE a.PARTYCODE NOT IN (SELECT partycode FROM CEASED)  
      AND a.MAGID = 1 
      ORDER BY b.place
    `, { type: Sequelize.QueryTypes.SELECT });

    console.log("results", results);
    return results;
  } catch (error) {
    console.error("Error executing query", error);
    throw error;
  }
};

const fetchReportsForPrint = async () => {
  return await initialSequelize.query(`
    select c.AREANAME as District, partycode as agent,b.heada_name as name,b.place,a.copies from COPYCONFIRM as a  inner join HEADACC b on a.PARTYCODE =b.heada_code 
inner join DISTRICTMASTER c on b.DISTRICTCODE=c.AREACODE
where  a.PARTYCODE not in
  (select partycode from CEASED)  and a.MAGID=1 order by c.AREANAME,b.heada_code
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
  insertCreditDebitCollection,
  deleteCreditDebitCollection,
  deleteCollection,
  fetchReports,
  getChallanCounterNo,
  fetchReportsForPrint
}