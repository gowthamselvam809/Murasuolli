const { userRepository } = require('../repository');
const { constant: { Messages } } = require("../constants");
const { jwt: { jwtVerify }, util: { isEmptyArray, isEmptyObject, ERROR }, enumHelper: { hasAny, is }} = require("../helper")

const auth = (allowedRoles = []) => {

    return async function (req, res, next) {

        // Step1: Verify Token Present in Authorization Header or not
        const token = req.header("Authorization");

        if (!token) {
            next({ status: ERROR.UNAUTHORIZED, message: Messages.TOKEN_REQUIRED });
        }

        try {
            // Step2: Synchronously verify given token using a secret or a public key to get a decoded token
            const decoded = jwtVerify(token);
            if (isEmptyObject(req.body)) {
                req.body = {};
            }
            req.body.currentUser = decoded;

            if (isEmptyArray(allowedRoles)) {
                next();
            }

            // Step3: Authorization checks whether a user is allowed to perform an action or has access to some functionality
            let user = await userRepository.getById(req.body.currentUser.userId);
            if (user.active && hasAny(user.type, allowedRoles) && is(req.body.currentUser.type, user.type)) {
                next();
            }
            else {
                next({ status: ERROR.UNAUTHORIZED, message: Messages.ACCESS_DENIED });
            }
        } catch (err) {
            err.message === "jwt expired" ? next({ status: ERROR.UNAUTHORIZED, message: err.message }) : next({ status: ERROR.INTERNAL_SERVER_ERROR, message: err.message });
        }
    }
}

module.exports = auth;
