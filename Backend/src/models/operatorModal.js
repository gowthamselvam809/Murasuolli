const { DataTypes } = require('sequelize');
const dynamicSequelize = require('../../dynamicSequelize');


const operatorModal = (dbName) => {
    const sequelize = dynamicSequelize(dbName);
    return sequelize.define('operator', {
        MOpe_Code: { type: DataTypes.INTEGER },
        MOpe_Name: { type: DataTypes.STRING },
        MOpe_Pwd: { type: DataTypes.STRING },
        MOpe_Level: { type: DataTypes.INTEGER },
        MOpe_Status: { type: DataTypes.STRING }
    }, {
        tableName: 'operator',
        timestamps: false
    })
};


module.exports = operatorModal;