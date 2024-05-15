const { isEmptyObject, formatErrorResponse } = require('../helper/util');
const { issuesRepository } = require('../repository');


const fetchAllIssuesBasedOnDates = async (request) => {
    return await issuesRepository.fetchAllIssuesBasedOnDates(request);
}

const insertIssues = async (request) => {
    const isProcessed = await issuesRepository.isAlreadyInserted(request);
    if (isProcessed == null || isEmptyObject(isProcessed)) {
        return await issuesRepository.insertIssues(request);
    } else {
        throw formatErrorResponse("Issues already Processed for this date, please try different Date!!");
    }
}

const fetchIssuesBasedOnDate = async (request) => {
    return await issuesRepository.fetchIssuesBasedOnDate(request);
}

const fetchMaxIssDate = async (request) => {
    return await issuesRepository.fetchMaxIssDate(request);
}

const fetchEditIssuesByDate = async (request) => {
    const isValid = await issuesRepository.isAlreadyInserted(request);
    console.log(isValid)
    if (isValid !== null || !isEmptyObject(isValid)) {
        return await issuesRepository.fetchEditIssuesByDate(request);
    }
    throw formatErrorResponse('There is no processed issues on this Date...')
}
const updateIssueCopy = async (request) => {
    return await issuesRepository.updateIssueCopy(request);
}


module.exports = {
    fetchAllIssuesBasedOnDates,
    insertIssues,
    fetchIssuesBasedOnDate,
    fetchMaxIssDate,
    fetchEditIssuesByDate,
    updateIssueCopy
}