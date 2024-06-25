const { where } = require('sequelize');
const dynamicSequelize = require('../../dynamicSequelize')
const { getCurrentTimestamp, subtractDays, formatErrorResponse, ensureGetCopiesFunctionExists } = require('../helper/util')
const { issuesModal } = require('../models');
const { updateCopyConfirmByIssues } = require('./copyConfirmRepository');

const fetchAllIssuesBasedOnDates = async (requestData) => {
  const transactionSequelize = await dynamicSequelize(requestData.dbName);

  const records = await transactionSequelize.query(`
     SELECT  ROW_NUMBER() OVER (ORDER BY a.[PARTYCODE]) AS 'SNO'
      ,a.[PARTYCODE]
      ,1 as 'magid'
      ,a.[COMMISSION]
      ,0 as [DEPOSIT]
      ,a.cnos as [COPIES]
      ,a.[COMMID]
      ,'2024-14-01' as DATE1
      ,5 as [saleRATE]
      ,'2024-014-01' as[CDATE]
      ,'' as [CLOSED]
      ,'' as [ISSNO]
      ,'' as [compliment]
      ,'2024-04-05' as [ISSDATE]
      ,0 as [billno]
      ,'2024-04-05' as [billdate]
      ,0 as [areacode]
      ,'input' [OPERCODE]
      ,'2024-04-05' as [UPDATED]
      ,'input' UPTIME
  FROM (select * from ${requestData.dbName}.dbo.COPYCONFIRM as a where  a.PARTYCODE not in
  (select partycode from ${requestData.dbName}.dbo.CEASED))  as a 
  `)

  // for inserting into the issues
  // INSERT INTO issues (SNO, PARTYCODE, magid, COMMISSION, DEPOSIT, COPIES, COMMID, DATE1, saleRATE, CDATE, CLOSED, ISSNO, compliment, ISSDATE, billno, billdate, areacode, OPERCODE, UPDATED, UPTIME)






  // const copyConfirmRecords = await transactionSequelize.findAll({
  //   where: { magId: 1 },
  //   attributes: ['sno', 'partyCode', 'magId', 'commId', 'closed', 'copies', 'updated'],
  //   raw: true,
  //   order: [
  //     ['partyCode', 'ASC']
  //   ],
  // });
  // const recordsWithId = copyConfirmRecords.map(record => ({
  //   ...record,
  //   id: record.sno
  // }));
  return records;
}

const fetchMaxIssDate = async (requestData) => {
  try {
    const transactionSequelize = await dynamicSequelize(requestData.financial);
    return await transactionSequelize.query(`
   select max(issdate) as maxDate from ISSUES
`);
  } catch (error) {
    console.log(error)
    throw formatErrorResponse(error)
  }
}

const fetchEditIssuesByDate = async (requestData) => {
  try {
    const transactionSequelize = dynamicSequelize(requestData.financial);
    // console.log(subtractDays(requestData.issDate, 1))
    await ensureGetCopiesFunctionExists(transactionSequelize, requestData.financial)
    return await transactionSequelize.query(`
      select  ROW_NUMBER() OVER (ORDER BY (SELECT NULL)) AS id, partyCode,dbo.getCopies('${subtractDays(requestData.issDate, 3)}',partycode) as '${subtractDays(requestData.issDate, 3)}',
      dbo.getCopies('${subtractDays(requestData.issDate, 2)}',partycode) as '${subtractDays(requestData.issDate, 2)}',
      dbo.getCopies('${subtractDays(requestData.issDate, 1)}',partycode) as '${subtractDays(requestData.issDate, 1)}', 
      COPIES as Today from ISSUES where ISSDATE='${subtractDays(requestData.issDate, 0)}'

  `)
  } catch (error) {
    console.log(error);
    throw formatErrorResponse(error)
  }
}


const insertIssues = async (requestData) => {
  const transactionSequelize = dynamicSequelize(requestData.financial);

  return await transactionSequelize.query(`
   insert into ${requestData.financial}.dbo.ISSUES  select ROW_NUMBER() OVER (ORDER BY a.[PARTYCODE]) AS 'SNO'
      ,a.[PARTYCODE]
      ,1 as 'magid'
      ,a.[COMMISSION]
      ,0 as [DEPOSIT]
      ,a.cnos as [COPIES]
      ,a.[COMMID]
      ,:date as DATE1
      ,b.Salerate as [saleRATE]
      ,'2024-04-01' as[CDATE]
      ,'' as [CLOSED]
      ,'' as [ISSNO]
      ,'' as [compliment]
      ,:date1 as [ISSDATE]
      ,0 as [billno]
      ,:date2 as [billdate]
      ,0 as [areacode]
      ,'1' [OPERCODE]
      ,:date3 as [UPDATED]
      ,null
  FROM (select * from ${requestData.dbName}.dbo.COPYCONFIRM as s where s.magid=1 and s.PARTYCODE not in
  (select partycode from ${requestData.dbName}.dbo.CEASED))  as a inner join ${requestData.dbName}.dbo.MAGAZINE as b on a.magid=b.Magid
  `, {
    replacements: {
      date: requestData.issDate,
      date1: requestData.issDate,
      date2: requestData.issDate,
      date3: requestData.issDate,
    }
  })

};

const isAlreadyInserted = async (requestData) => {
  return await issuesModal(requestData.financial).findOne({
    where: { issDate: requestData.issDate },
    attributes: {
      exclude: ['id']
    },
    order: [['sno', 'ASC']]
  })
}

const fetchIssuesBasedOnDate = async (requestData) => {
  const transactionSequelize = dynamicSequelize(requestData.financial);
  return await issuesModal(requestData.dbName).findAll({
    where: {
      issDate: requestData.issDateP
    },
    attributes: {
      exclude: ['id']
    }
  })
}

const updateIssueCopy = async (requestData) => {
  console.log(requestData);
  const transactionSequelize = dynamicSequelize(requestData.financial);
  await updateCopyConfirmByIssues(requestData)
  return await transactionSequelize.query(`
  update issues set copies = :copies where partyCode = :partyCode AND issDate = :issDate`,
    {
      replacements: {
        issDate: requestData.today,
        partyCode: requestData.partyCode,
        copies: requestData.copies
      }
    })
}

module.exports = {
  fetchAllIssuesBasedOnDates,
  insertIssues,
  isAlreadyInserted,
  fetchIssuesBasedOnDate,
  fetchMaxIssDate,
  fetchEditIssuesByDate,
  updateIssueCopy
}