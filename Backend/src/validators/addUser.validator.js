const Joi = require('joi')
const { constant: { Label } } = require('../constants');

const addUserSchema = Joi.object({
    firstName: Joi.string().trim().min(1).max(255), 
    lastName: Joi.string().trim().min(1).max(255), 
    email: Joi.string().email().lowercase().required().label(Label.Email),
    password: Joi.forbidden(),
    phone: Joi.string().trim().min(10).max(15),
    city: Joi.string().trim().min(2).max(255)
});

module.exports = addUserSchema;