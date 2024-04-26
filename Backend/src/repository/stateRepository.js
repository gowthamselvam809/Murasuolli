const { stateModal } = require('../models')

const fetchUserById = async (id) => (await stateModal.findOne({
  where: { heada_code: id },
  attributes: {
    exclude: ['id']
  },
  order: [['heada_code', 'ASC']]
}));

const fetchAllState = async () => (await stateModal.findAll({
  attributes: {
    exclude: ['id']
  }
}))

module.exports = {
  fetchUserById,
  fetchAllState
}