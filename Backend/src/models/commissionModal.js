const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelize');


const commissionModal = sequelize.define('commcatg', {
    commName: { type: DataTypes.STRING },
    commId: { type: DataTypes.INTEGER },
    magId: { type: DataTypes.INTEGER },
    commPer: { type: DataTypes.FLOAT },
    incentive: { type: DataTypes.FLOAT },
    operCode: { type: DataTypes.STRING },
    commShort: { type: DataTypes.STRING },
    updated: { type: DataTypes.DATE },
}, {
    tableName: 'commcatg',
    timestamps: false
});


module.exports = commissionModal;
