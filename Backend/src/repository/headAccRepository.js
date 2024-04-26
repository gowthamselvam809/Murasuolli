const { headAccModal } = require('../models')

const fetchUserById = async (id) => (await headAccModal.findOne({
  where: { heada_code: id },
  attributes: {
    exclude: ['id']
  },
  order: [['heada_code', 'ASC']]
}));

const fetchAllUser = async () => (await headAccModal.findAll({
  attributes: {
    exclude: ['id']
  }
}))

module.exports = {
  fetchUserById,
  fetchAllUser
}