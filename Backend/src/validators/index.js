const addUser = require('./addUser.validator')
const changePassword = require('./changePassword.validator')
const changePasswordById = require('./changePasswordById.validator')
const forgotPassword = require('./forgotPassword.validator')
const inviteUser = require('./inviteUser.validator')
const updateProfile = require('./updateProfile.validator')
const userLogin = require('./userLogin.validator')
const userRegister = require('./userRegister.validator')
const userVerification = require('./userVerification.validator')
const editUser = require('./editUser.validator')
const deleteUser = require('./deleteUser.validator')



module.exports = {
    addUser,
    changePassword,
    changePasswordById,
    forgotPassword,
    inviteUser,
    updateProfile,
    userLogin,
    userRegister,
    userVerification,
    editUser,
    deleteUser
}