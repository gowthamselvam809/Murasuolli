const Joi = require('joi')
const { constant: { Label } } = require('../constants');

const verificationLinkSchema = Joi.string().uri({
    scheme: ['http', 'https'],
}).label(Label.VerificationLink);

const InviteUserSchema = Joi.object({
    email: Joi.string().required().label(Label.Email),
    role: Joi.number().required().label(Label.UserRole),
    verificationLink: verificationLinkSchema
});

module.exports = InviteUserSchema;