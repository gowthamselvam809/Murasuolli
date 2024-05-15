const sequelize = require('../../sequelize');
const { getCurrentTimestamp, formatErrorResponse } = require('../helper/util');
const { headAccModal } = require('../models')

const fetchUserById = async (id) => (await headAccModal.findOne({
  where: { heada_code: id },
  attributes: {
    exclude: ['id']
  },
  order: [['heada_code', 'ASC']]
}));

const fetchAllUser = async () => {
  try {
    return await headAccModal.findAll({
      where: {
        active: null
      },
      attributes: {
        exclude: ['id']
      }
    })
  } catch (error) {
    console.log(error)
    throw formatErrorResponse(error);
  }
}

const fetchAllBankType = async () => (await headAccModal.findAll({
  where: {
    active: null,
    headType: 'B'
  },
  attributes: {
    exclude: ['id']
  }
}))

const addAgent = async (requestData) => await sequelize().query(`
    INSERT INTO headacc (address1, city, districtCode, headType, heada_code, accCode, heada_name, operCode, phone1, pinCode, place, state)
    VALUES (:address1, :city, :districtCode, :headType, :heada_code, :accCode, :heada_name, :operCode, :phone1, :pinCode, :place, :state)
`, {
  replacements: {
    heada_code: requestData.heada_code.toUpperCase(),
    heada_name: requestData.heada_name.toUpperCase(),
    address1: requestData.address1.toUpperCase(),
    city: requestData.city ? requestData.city.toUpperCase() : null,
    districtCode: requestData.districtCode ? requestData.districtCode : null,
    headType: requestData.headType,
    operCode: requestData.operCode ? requestData.operCode : null,
    phone1: requestData.phone1 ? requestData.phone1 : null,
    pinCode: requestData.pinCode,
    place: requestData.place ? requestData.place.toUpperCase() : null,
    state: requestData.state ? requestData.state.toUpperCase() : null,
    accCode: requestData.accCode ? requestData.accCode.toUpperCase() : null
  },
  type: sequelize.QueryTypes.INSERT
});

const updateAgent = async (requestData) => await sequelize().query(`
    UPDATE headacc
    SET address1 = :address1,
        city = :city,
        districtCode = :districtCode,
        headType = :headType,
        heada_name = :heada_name,
        operCode = :operCode,
        phone1 = :phone1,
        pinCode = :pinCode,
        place = :place,
        state = :state,
        accCode = :accCode,
        active = :active
    WHERE heada_code = :heada_code
`, {
  replacements: {
    address1: requestData.address1.toUpperCase(),
    city: requestData.city ? requestData.city.toUpperCase() : null,
    districtCode: requestData.districtCode ? requestData.districtCode : null,
    headType: requestData.headType,
    heada_code: requestData.heada_code.toUpperCase(),
    heada_name: requestData.heada_name.toUpperCase(),
    operCode: requestData.operCode ? requestData.operCode : null,
    phone1: requestData.phone1 ? requestData.phone1 : null,
    pinCode: requestData.pinCode,
    place: requestData.place ? requestData.place.toUpperCase() : null,
    state: requestData.state ? requestData.state.toUpperCase() : null,
    accCode: requestData.accCode ? requestData.accCode.toUpperCase() : null,
    active: requestData?.active ? requestData.active : null
  },
  type: sequelize.QueryTypes.UPDATE
});

const deleteAgent = async (requestData) => (await sequelize().query(`UPDATE headacc
    SET active = :active WHERE heada_code = :heada_code`, {
  replacements: {
    active: false,
    heada_code: requestData.heada_code
  }
}))


module.exports = {
  fetchUserById,
  fetchAllUser,
  addAgent,
  updateAgent,
  deleteAgent,
  fetchAllBankType
}