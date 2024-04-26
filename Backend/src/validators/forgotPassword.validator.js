const Joi = require('joi')
const { constant: { Label } } = require('../constants');

const verificationLinkSchema = Joi.string().uri({
    scheme: ['http', 'https'],
}).label(Label.VerificationLink);

const forgotPasswordSchema = Joi.object({
    email: Joi.string().email().lowercase().required().label(Label.Email),
    verificationLink: verificationLinkSchema
});

module.exports = forgotPasswordSchema;