const { userRepository } = require('../repository');

const fetchUser = async (request) => {
    const { id } = request;
    return await userRepository.getById(id);
};

module.exports = {
    fetchUser
}