const bcrypt = require('bcryptjs');
const { headAccRepository } = require('../repository');



const fetchUser = async (request) => {
    return await headAccRepository.fetchUserById(request.id);
}

const fetchAllUser = async (request) => {
    return await headAccRepository.fetchAllUser(request.id);
}



module.exports = {
    fetchUser,
    fetchAllUser
}