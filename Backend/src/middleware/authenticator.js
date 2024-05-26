const { Messages } = require("../constants/constant");
const { ERROR, isValidate, formatErrorResponse } = require("../helper/util");

const authenticator = (req, res, next) => {
    if (req) {
        req.body.dbName = req.headers.database;
        req.body.financial = req.headers.financial;
        // console.log(req.headers.financial)
        // next();
    }

    if (isValidate(req.headers.authenticate)) {
        next();
        return;
    }
    next({ status: ERROR.UNAUTHORIZED, message: Messages.SOMETHING_WENT_WRONG });

};


module.exports = authenticator;
