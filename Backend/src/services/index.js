const authService = require('./authService')
const emailService = require('./emailService')
const s3Service = require('./s3Service')
const headAccService = require('./headAccService')
const stateService = require('./stateService')

module.exports = {
    authService,
    emailService,
    s3Service,
    headAccService,
    stateService
}