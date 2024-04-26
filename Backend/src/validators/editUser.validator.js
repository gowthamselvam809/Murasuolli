const Joi = require('joi')
const { idRequired } = require('./common.validator')

const editUserSchema = Joi.object({
    id: idRequired,
    firstName: Joi.string().trim().min(1).max(255), 
    lastName: Joi.string().trim().min(1).max(255), 
    email: Joi.forbidden(),
    password: Joi.forbidden(),
    phone: Joi.string().trim().min(10).max(15),
    city: Joi.string().trim().min(2).max(255)
});

module.exports = editUserSchema;