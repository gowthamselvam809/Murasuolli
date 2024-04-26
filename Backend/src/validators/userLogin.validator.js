const Joi = require('joi')
const { constant: { Label } } = require('../constants');

const userLoginSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required(),
});

module.exports = userLoginSchema;