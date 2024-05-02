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

const { headAccController, stateController, districtController, magazineController, reasonController, copyConfirmController, commissionController } = require('./src/controller')
const { auth, validator } = require('./src/middleware');
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

app.post("/fetchAgent", headAccController.fetchUser);

app.post("/fetchAllAgent", headAccController.fetchAllUser);

app.post("/fetchAllState", stateController.fetchAllState);

app.post("/createState", stateController.createState);

app.post("/updateState", stateController.updateState);

app.post("/fetchAllDistrict", districtController.fetchAllDistrict);

app.post("/updateDistrict", districtController.updateDistrict);

app.post("/createDistrict", districtController.createDistrict);

app.post("/addAgent", headAccController.addAgent);

app.post("/updateAgent", headAccController.updateAgent);

app.post("/deleteAgent", headAccController.deleteAgent);

app.post("/fetchAllMagazine", magazineController.fetchAllMagazine);

app.post("/updateMagazine", magazineController.updateMagazine);

app.post("/createMagazine", magazineController.createMagazine);

app.post("/fetchAllBankType", headAccController.fetchAllBankType);

app.post("/fetchAllReason", reasonController.fetchAllReason);

app.post("/updateReason", reasonController.updateReason);

app.post("/createReason", reasonController.createReason);

app.post("/fetchAllCopyConfirm", copyConfirmController.fetchAllCopyConfirm);

app.post("/updateCopyConfirm", copyConfirmController.updateCopyConfirm);

app.post("/createCopyConfirm", copyConfirmController.createCopyConfirm);

app.post("/fetchAllCommission", commissionController.fetchAllCommission);

app.post("/createCommission", commissionController.createCommission);

app.post("/updateCommission", commissionController.updateCommission);

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
