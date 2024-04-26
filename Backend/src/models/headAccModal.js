const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelize');


const headAcc = sequelize.define('headacc', {
    heada_code: { type: DataTypes.STRING },
    heada_name: { type: DataTypes.STRING },
    address1: { type: DataTypes.STRING },
    address2: { type: DataTypes.STRING },
    address3: { type: DataTypes.STRING },
    address4: { type: DataTypes.STRING },
    rev_cap: { type: DataTypes.STRING },
    inExp: { type: DataTypes.STRING },
    dcrc: { type: DataTypes.STRING },
    place: { type: DataTypes.STRING },
    state: { type: DataTypes.STRING },
    tradePandl: { type: DataTypes.STRING },
    city: { type: DataTypes.STRING },
    pinCode: { type: DataTypes.STRING },
    phone1: { type: DataTypes.STRING },
    phone2: { type: DataTypes.STRING },
    ledPrint: { type: DataTypes.STRING },
    headType: { type: DataTypes.STRING },
    groupCode: { type: DataTypes.STRING },
    subGroup: { type: DataTypes.STRING },
    tdsFlag: { type: DataTypes.STRING },
    tdsPer: { type: DataTypes.INTEGER },
    supplierCode: { type: DataTypes.STRING },
    accCode: { type: DataTypes.STRING },
    operCode: { type: DataTypes.STRING },
    lok: { type: DataTypes.STRING },
    outstanding: { type: DataTypes.STRING },
    AutoGen: { type: DataTypes.STRING },
    WoTax: { type: DataTypes.STRING },
    districtCode: { type: DataTypes.STRING },
    locOut: { type: DataTypes.STRING },
    updated: { type: DataTypes.DATE },
    upTime: { type: DataTypes.DATE },
    active: { type: DataTypes.STRING },
}, {
    tableName: 'headacc',
    timestamps: false
});


module.exports = headAcc;
