
const { util: {ERROR} } = require("../helper");
const Validators = require('../validators')

const validator = (validatorName) => {
    if (!Validators.hasOwnProperty(validatorName))
        throw new Error(`'${validatorName}' validator is not exist`)

    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };

    return async function (req, res, next) {
        try {
            await Validators[validatorName].validateAsync(req.body, options)
            next()
        } catch (err) {
            if (err.isJoi)
                return next({ status: ERROR.UNPROCESSABLE_ENTITY, message: `Validation error: ${err.details.map(x => x.message).join(', ')}` });
            next({ message: err.message || "Invalid request data. Please review request and try again." });
        }
    }
}

module.exports = validator;