const { DataTypes } = require('sequelize');
const dynamicSequelize = require('../../dynamicSequelize');


const financialYearModal = (dbName) => {
    const sequelize = dynamicSequelize(dbName);
    return sequelize.define('filemain', {
        transFile: { type: DataTypes.STRING },
        periodFrom: { type: DataTypes.STRING },
        periodTo: { type: DataTypes.STRING },
        compCode: { type: DataTypes.STRING }
    }, {
        tableName: 'filemain',
        timestamps: false
    })
};


module.exports = financialYearModal;