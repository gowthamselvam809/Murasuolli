const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelize');


const districtModal = sequelize.define('districtmaster', {
    areaCode: { type: DataTypes.STRING },
    areaName: { type: DataTypes.STRING },
    stCode: { type: DataTypes.STRING },
    areaSht: { type: DataTypes.STRING },
    operCode: { type: DataTypes.STRING },
    updated: { type: DataTypes.DATE },
    upTime: { type: DataTypes.STRING }
}, {
    tableName: 'districtmaster',
    timestamps: false
});


module.exports = districtModal;
