const Joi = require('joi')
const { constant: { Label } } = require('../constants');

const userVerificationSchema = Joi.object({
    email: Joi.string().email().lowercase().required().label(Label.Email),
    otp: Joi.number().min(6).required().label(Label.OTP),
});

module.exports = userVerificationSchema;