const http = require("http");
const express = require("express");
const app = express();
var timeout = require('connect-timeout');
app.use(timeout('30s'));
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
dotenv.config();
const cors = require('cors');

const swaggerUI = require('swagger-ui-express')
const yaml = require('js-yaml')
const swaggerJSDocs = yaml.load('./api.yaml')

const { headAccController, stateController, districtController, magazineController, reasonController, copyConfirmController, commissionController, issuesController, companyController, financialYearController, operatorController, collectionController } = require('./src/controller')
const { auth, validator, authenticator } = require('./src/middleware');
const { constant: { Environment, Roles } } = require("./src/constants");
const { util: { ERROR } } = require('./src/helper');

var NODE_ENV = process.env.NODE_ENV || 'development';

app.use(express.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 100000,
}));

app.use(express.json({
    type: "application/json",
    limit: '50mb'
}));


app.use(haltOnTimedout);

app.use(fileUpload());

app.use(cors());

app.get('/', (req, res) => { res.send('Welcome to Murasuolli!!!'); });
app.post("/fetchAgent", authenticator, headAccController.fetchUser);
app.post("/fetchAllAgent", authenticator, headAccController.fetchAllUser);
app.post("/fetchBankForDropdown", authenticator, headAccController.fetchBankForDropdown);
app.post("/fetchAllState", authenticator, stateController.fetchAllState);
app.post("/createState", authenticator, stateController.createState);
app.post("/updateState", authenticator, stateController.updateState);
app.post("/fetchAllDistrict", authenticator, districtController.fetchAllDistrict);
app.post("/updateDistrict", authenticator, districtController.updateDistrict);
app.post("/createDistrict", authenticator, districtController.createDistrict);
app.post("/addAgent", authenticator, headAccController.addAgent);
app.post("/fetchAgentForDropdown", authenticator, headAccController.fetchAgentForDropdown);
app.post("/updateAgent", authenticator, headAccController.updateAgent);
app.post("/deleteAgent", authenticator, headAccController.deleteAgent);
app.post("/fetchAllMagazine", authenticator, magazineController.fetchAllMagazine);
app.post("/updateMagazine", authenticator, magazineController.updateMagazine);
app.post("/createMagazine", authenticator, magazineController.createMagazine);
app.post("/fetchAllBankType", authenticator, headAccController.fetchAllBankType);
app.post("/fetchAllReason", authenticator, reasonController.fetchAllReason);
app.post("/updateReason", authenticator, reasonController.updateReason);
app.post("/createReason", authenticator, reasonController.createReason);
app.post("/fetchReasonForDropdown", authenticator, reasonController.fetchReasonForDropdown);
app.post("/fetchAllCopyConfirm", authenticator, copyConfirmController.fetchAllCopyConfirm);
app.post("/updateCopyConfirm", authenticator, copyConfirmController.updateCopyConfirm);
app.post("/createCopyConfirm", authenticator, copyConfirmController.createCopyConfirm);
app.post("/fetchAllCommission", authenticator, commissionController.fetchAllCommission);
app.post("/createCommission", authenticator, commissionController.createCommission);
app.post("/updateCommission", authenticator, commissionController.updateCommission);
app.post("/updateCommission", authenticator, commissionController.updateCommission);
app.post("/updateCommission", authenticator, commissionController.updateCommission);
app.post("/fetchAllIssuesBasedOnDates", authenticator, issuesController.fetchAllIssuesBasedOnDates);
app.post("/fetchIssuesBasedOnDate", authenticator, issuesController.fetchIssuesBasedOnDate);
app.post("/insertIssues", authenticator, issuesController.insertIssues);
app.post("/fetchMaxIssDate", authenticator, issuesController.fetchMaxIssDate);
app.post("/fetchEditIssuesByDate", authenticator, issuesController.fetchEditIssuesByDate);
app.post("/updateIssueCopy", authenticator, issuesController.updateIssueCopy);
app.post("/fetchAllCompanies", authenticator, companyController.fetchAllCompanies);
app.post("/fetchAllFinancialYear", authenticator, financialYearController.fetchAllFinancialYear);
app.post("/fetchAllOperator", authenticator, operatorController.fetchAllOperator);
app.post("/userLogin", authenticator, operatorController.userLogin);
app.post("/fetchAllCollection", authenticator, collectionController.fetchAllCollection);
app.post("/fetchReceiptNo", authenticator, collectionController.fetchReceiptNo);
app.post("/fetchVoucherNo", authenticator, collectionController.fetchVoucherNo);
app.post("/insertCollection", authenticator, collectionController.insertCollection);
app.post("/updateCollection", authenticator, collectionController.updateCollection);
app.post("/fetchEntryNo", authenticator, collectionController.fetchEntryNo);
app.post("/processSupply", authenticator, collectionController.processSupply);
app.post("/viewSupply", authenticator, collectionController.viewSupply);

app.use(timeout('180s'));


function haltOnTimedout(req, res, next) {
    if (!req.timedout) next()
}

app.use((err, req, res, next) => {
    console.log(`Path: ${req.path} -> Status Code: ${err.status || ERROR.INTERNAL_SERVER_ERROR} -> Stack: ${err.stack}`)
    res.status(err.status || ERROR.INTERNAL_SERVER_ERROR).send(err.message);
});

if (NODE_ENV === Environment.Development || NODE_ENV === Environment.Testing) {
    const swaggerOptions = {
        explorer: true, // Enable Swagger UI explorer in development and testing environments
    };
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJSDocs, swaggerOptions));
}

app.set("port", process.env.PORT || 3001);

let server = http.createServer(app);

server.listen(app.get("port"), "0.0.0.0", () => {
    console.log(`Express server listening on http://localhost:${app.get("port")}`);
});
