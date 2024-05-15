const { DataTypes } = require('sequelize');
const sequelize = require('../../dynamicSequelize')('AdventureWorks2022');


const companyModal = sequelize.define('company', {
    compCode: { type: DataTypes.STRING },
    compName: { type: DataTypes.STRING },
    address1: { type: DataTypes.STRING },
    address2: { type: DataTypes.STRING },
    city: { type: DataTypes.STRING },
    pinCode: { type: DataTypes.STRING },
}, {
    tableName: 'company',
    timestamps: false
});


module.exports = companyModal;