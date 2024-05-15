const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelize');


const copyConfirmModal = sequelize.define('copyconfirm', {
    partyCode: { type: DataTypes.STRING },
    sno: { type: DataTypes.INTEGER },
    magId: { type: DataTypes.INTEGER },
    commId: { type: DataTypes.INTEGER },
    copies: { type: DataTypes.INTEGER },
    updated: { type: DataTypes.DATE },
    closed: { type: DataTypes.STRING }
}, {
    tableName: 'copyconfirm',
    timestamps: false
});


module.exports = copyConfirmModal;
