const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelize');


const stateModal = sequelize.define('statemaster', {
    stateCode: { type: DataTypes.STRING, },
    stateName: { type: DataTypes.STRING },
    country: { type: DataTypes.STRING },
    operCode: { type: DataTypes.STRING },
    upTime: { type: DataTypes.STRING },
    updated: { type: DataTypes.DATE },
}, {
    tableName: 'statemaster',
    timestamps: false
});


module.exports = stateModal;
