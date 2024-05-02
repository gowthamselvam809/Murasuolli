const { DataTypes } = require('sequelize');
const sequelize = require('../../sequelize');


const magazineModal = sequelize.define('magazine', {
    magId: { type: DataTypes.INTEGER },
    magName: { type: DataTypes.STRING },
    magShort: { type: DataTypes.STRING },
    saleRate: { type: DataTypes.FLOAT },
    unSoldRate: { type: DataTypes.FLOAT },
    unSoldPer: { type: DataTypes.FLOAT },
    upTime: { type: DataTypes.STRING },
    deposit: { type: DataTypes.FLOAT },
    magIssDay: { type: DataTypes.STRING },
    magIssMode: { type: DataTypes.STRING },
    updated: { type: DataTypes.DATE },
    upTime: { type: DataTypes.STRING }
}, {
    tableName: 'magazine',
    timestamps: false
});


module.exports = magazineModal;
