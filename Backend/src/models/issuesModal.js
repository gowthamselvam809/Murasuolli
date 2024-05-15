const { DataTypes } = require('sequelize');
const dynamicSequelize = require('../../dynamicSequelize');


const issueModal = (dbName) => {
    const sequelize = dynamicSequelize(dbName);
    return sequelize.define('issues',
        {
            partyCode: { type: DataTypes.STRING },
            sno: { type: DataTypes.INTEGER },
            magId: { type: DataTypes.INTEGER },
            commId: { type: DataTypes.INTEGER },
            copies: { type: DataTypes.INTEGER },
            updated: { type: DataTypes.DATE },
            closed: { type: DataTypes.STRING },
            issDate: { type: DataTypes.STRING },
            rate: { type: DataTypes.FLOAT },
            commission: { type: DataTypes.FLOAT },
            upTime: { type: DataTypes.STRING }

        }, {
        tableName: 'issues',
        timestamps: false
    })
};


module.exports = issueModal;
