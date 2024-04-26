const Joi = require('joi')
const { idRequired } = require('./common.validator');

const deleteUserSchema = Joi.object({ id: idRequired })

module.exports = deleteUserSchema;