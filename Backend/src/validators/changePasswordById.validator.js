const Joi = require('joi')
const { constant: { Label, RegexFormat } } = require('../constants');

const changePasswordByIdSchema = Joi.object({
    password: Joi.string().min(8).max(30).pattern(new RegExp(RegexFormat.Password)).required().label(Label.Password),
});

module.exports = changePasswordByIdSchema;