const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelize');


const reasonModal = sequelize.define('reason', {
    reasonId: { type: DataTypes.STRING },
    reasonName: { type: DataTypes.STRING },
    reasonShort: { type: DataTypes.STRING },
    acctCode: { type: DataTypes.STRING },
    operCode: { type: DataTypes.STRING },
    updated: { type: DataTypes.DATE },
    upTime: { type: DataTypes.STRING },
    depositTrf: { type: DataTypes.STRING },
}, {
    tableName: 'reason',
    timestamps: false
});


module.exports = reasonModal;
