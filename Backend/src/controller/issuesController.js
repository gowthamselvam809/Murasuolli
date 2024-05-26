const { issuesService } = require("../services");

const { util: { formatResponse } } = require('../helper');


const fetchAllIssuesBasedOnDates = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await issuesService.fetchAllIssuesBasedOnDates(request);
        res.send(formatResponse(result));
    } catch (error) {
        next(error);
    }
};

const fetchIssuesBasedOnDate = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await issuesService.fetchIssuesBasedOnDate(request);
        res.send(formatResponse(result));
    } catch (error) {
        next(error);
    }
};

const insertIssues = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await issuesService.insertIssues(request);
        res.send(formatResponse(result));
    } catch (error) {
        next(error);
    }
};

const fetchMaxIssDate = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await issuesService.fetchMaxIssDate(request);
        res.status(200).json(formatResponse(result));
    } catch (error) {
        next(error);
    }
};

const fetchEditIssuesByDate = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await issuesService.fetchEditIssuesByDate(request);
        res.send(formatResponse(result));
    } catch (error) {
        next(error);
    }
};
const updateIssueCopy = async (req, res, next) => {
    try {
        let request = req.body;
        let result = await issuesService.updateIssueCopy(request);
        res.send(formatResponse(result));
    } catch (error) {
        next(error);
    }
};

module.exports = {
    fetchAllIssuesBasedOnDates,
    fetchIssuesBasedOnDate,
    insertIssues,
    fetchMaxIssDate,
    fetchEditIssuesByDate,
    updateIssueCopy
}