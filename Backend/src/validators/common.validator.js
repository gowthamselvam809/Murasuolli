const Joi = require('joi')

const idRequired = Joi.string().guid({ version: 'uuidv4' }).required();
const stringRequired = Joi.string().required();

const user_id = idRequired;

const session_id = idRequired;

module.exports = {
    idRequired,
    user_id,
    session_id,
    stringRequired
}