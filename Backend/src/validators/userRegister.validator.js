const Joi = require('joi')
const { constant: { Label } } = require('../constants');

const userRegisterSchema = Joi.object({
    firstName: Joi.string().required().label(Label.FirstName),
    lastName: Joi.string().required().label(Label.LastName),
    email: Joi.string().email().lowercase().required().label(Label.Email),
    password: Joi.string().min(6).required().label(Label.Password),
});

module.exports = userRegisterSchema;