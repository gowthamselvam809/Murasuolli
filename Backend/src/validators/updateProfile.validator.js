const Joi = require('joi')
const { constant: { Label } } = require('../constants');

const updateProfile = Joi.object({
    firstName: Joi.string().min(2).required().label(Label.FirstName),
    lastName: Joi.string().min(2).required().label(Label.LastName),
});

module.exports = updateProfile;