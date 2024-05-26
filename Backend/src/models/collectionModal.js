const { DataTypes } = require('sequelize');
const dynamicSequelize = require('../../dynamicSequelize');

const collectionModal = (dbName) => {
    const sequelize = dynamicSequelize(dbName);
    return sequelize.define('collection',
        {
            partyCode: { type: DataTypes.STRING },
            docNo: { type: DataTypes.INTEGER },
            voucherNo: { type: DataTypes.INTEGER },
            contraCode: { type: DataTypes.STRING },
            updated: { type: DataTypes.DATE },
            docDate: { type: DataTypes.STRING },
            reason: { type: DataTypes.STRING },
            dues: { type: DataTypes.FLOAT },
            deposit: { type: DataTypes.FLOAT },
            upTime: { type: DataTypes.STRING },
            bankDet: { type: DataTypes.STRING },
            amount: { type: DataTypes.STRING },

        }, {
        tableName: 'collection',
        timestamps: false
    })
};




module.exports = collectionModal;
