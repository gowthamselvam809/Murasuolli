const jwt = require('jsonwebtoken');

exports.jwtSign = function (request) {
    const date = new Date();
    console.log(`Token Generated at:- ${date.getHours()} :${date.getMinutes()} :${date.getSeconds()} for ${request.email}`);
    return jwt.sign({ userId: request.id, email: request.email, firstName: request.firstName, lastName: request.lastName, type: request.type }, process.env.SECRET_KEY, { expiresIn: "2 days" });
}

exports.jwtVerify = (token) => jwt.verify(token, process.env.SECRET_KEY);